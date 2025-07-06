// B001001_ログイン照会BFF
"use server";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis";
import { schema } from "@/validators/auth/B001001Schema";
import { validateRequest } from "@/utils/apiUtils";
import { HTTP_STATUS } from "@/lib/apiConstants";
import { a001001Model } from "@/app/model/api/auth/A001001Model";
import { authErrorResponse } from "@/lib/response";

const SESSION_TIME = 60 * 60; // ログインの有効時間(1時間)

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
  await redis.set(sessionId, JSON.stringify(result.response_info), {
    ex: SESSION_TIME,
  });

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
