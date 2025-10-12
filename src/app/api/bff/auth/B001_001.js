// B001_001_認証機能_ログイン照会BFF
"use server";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis";
import { postSchema } from "@/schema/auth/bff/B001001Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a001001Model } from "@/domain/auth/api/A001001Model";
import * as CONSTANTS from "@/lib/apiConstants";
import { notFoundMethodErrorResponse } from "@/lib/response";

const SESSION_TIME = 60 * 60 * 24; // ログインの有効時間(24時間)

const methods = {
  post: async (payload) => post(payload),
};

export default async function B001_001(method, payload) {
  const handler = methods[method]?.(payload);
  // ハンドラが取得できない場合、404エラーを返却
  if (!handler) return notFoundMethodErrorResponse();

  // レスポンス返却
  return handler;
}

async function post(payload) {
  // バリデーションチェック
  const param = await validateRequest(postSchema, payload);
  if (param instanceof Response) return param;

  // A001_001_認証機能_ログイン照会API実行
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
    `${CONSTANTS.REDIS_KEY.AUTH_TOKEN}:${sessionId}`,
    JSON.stringify(result.response_info),
    CONSTANTS.REDIS_OPTION.EXPIRE,
    SESSION_TIME
  );

  const response = NextResponse.json(result, {
    status: CONSTANTS.HTTP_STATUS.OK,
  });

  // cookieに保存
  response.cookies.set(process.env.COOKIE_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === CONSTANTS.ENV.PRODUCTION,
    sameSite: CONSTANTS.COOKIE_OPTION.SAME_SITE,
    path: "/",
    maxAge: SESSION_TIME,
  });

  return response;
}
