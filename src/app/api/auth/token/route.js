// Next.js API Route(トークン取得BFF) BP002
"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis";
import { HTTP_STATUS, RESPONSE_CODE, CONTENT_TYPE } from "@/lib/apiConstants";
import { API_MSG } from "@/lib/messages";

export async function POST(req) {
  const param = await req.json();

  // cookieからセッションIDを取得
  // const cookieStore = await cookies();
  // const token = cookieStore.get(process.env.COOKIE_TOKEN);
  // const payload = jwt.verify(token, process.env.JWT_SECRET);
  // const sessionId = payload.sessionId;

  // const redisId = await redis.get(sessionId);

  // cookieが取得できないので、仮設定
  const userInfo = await redis.get("key");

  // ユーザー情報が取得できなければ認証エラー
  if (!userInfo) {
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

  // 正常終了(認証OK)
  return new Response(
    JSON.stringify({
      success_flg: true,
      code: RESPONSE_CODE.SUCCESS,
      message: null,
      user_info: userInfo,
    }),
    {
      status: HTTP_STATUS.OK,
      headers: {
        "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
      },
    }
  );
}
