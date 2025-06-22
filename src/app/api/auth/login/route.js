// Next.js API Route(ログイン照会BFF) BP001
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis";
import { schema } from "@/validators/BP001Schema";
import { validateRequest } from "@/utils/apiUtils";
import { HTTP_STATUS, RESPONSE_CODE, CONTENT_TYPE } from "@/lib/apiConstants";
import { ap001Model } from "@/app/model/api/AP001Model";
import { API_MSG } from "@/lib/messages";

const SESSION_EXPIRES_IN = 60 * 60; // ログインの有効時間(1時間)

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  // ログイン照会API呼び出し
  const result = await ap001Model(param);

  // 異常終了の場合、全て認証エラーとする
  if (!result.success_flg) {
    return new Response(
      JSON.stringify({
        success_flg: false,
        code: RESPONSE_CODE.AUTH_ERROR,
        message: API_MSG.authError,
      }),
      {
        status: HTTP_STATUS.UNAUTHORIZED,
        headers: {
          "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
        },
      }
    );
  }

  // トークンを生成
  const sessionId = crypto.randomUUID();
  const token = jwt.sign({ sessionId }, process.env.JWT_SECRET, {
    expiresIn: SESSION_EXPIRES_IN,
  });

  // Redisに保存
  await redis.set(sessionId, JSON.stringify(result.user_info), {
    ex: SESSION_EXPIRES_IN,
  });

  const response = NextResponse.json(result, {
    status: HTTP_STATUS.OK,
    headers: {
      "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
    },
  });

  response.cookies.set(process.env.COOKIE_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_EXPIRES_IN,
  });

  return response;
}
