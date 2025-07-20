// B001001_ログイン照会BFF
"use server";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis";
import { HTTP_STATUS } from "@/lib/apiConstants";
import { authErrorResponse } from "@/lib/response";
import { validateRequest } from "@/utils/apiUtils";
import { schema } from "@/validators/auth/B001001Schema";
import { a001001Model } from "@/app/model/api/auth/A001001Model";

const SESSION_TIME = 60 * 60 * 24; // ログインの有効時間(24時間)

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  // ログイン照会API実行
  const result = await a001001Model(param);

  // 異常終了の場合、全て認証エラーとする
  if (!result.success_flg) return authErrorResponse();

  // トークンを生成
  const sessionId = randomUUID();
  const token = jwt.sign({ sessionId }, process.env.JWT_SECRET, {
    expiresIn: SESSION_TIME,
  });

  // Redisに保存
  await redis.set(
    `auth_token:${sessionId}`,
    JSON.stringify(result.response_info),
    {
      ex: SESSION_TIME,
    }
  );

  const response = NextResponse.json(result, {
    status: HTTP_STATUS.OK,
  });

  // cookieに保存
  response.cookies.set(process.env.COOKIE_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TIME,
  });

  return response;
}
