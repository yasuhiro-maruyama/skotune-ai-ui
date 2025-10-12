// B001_002_認証機能_トークン情報BFF
"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis";
import * as CONSTANTS from "@/lib/apiConstants";
import {
  successResponse,
  notFoundMethodErrorResponse,
  authErrorResponse,
} from "@/lib/response";

const methods = {
  get: async () => get(),
  delete: async () => del(),
};

export default async function B000_001(method, _) {
  const handler = methods[method];
  // ハンドラが取得できない場合、404エラーを返却
  if (!handler) return notFoundMethodErrorResponse();

  // レスポンス返却
  return handler();
}

async function get() {
  const sessionId = await getSessionId();

  // セッションIDが取得できない場合、認証エラー
  if (!sessionId) return authErrorResponse();

  // Redisからユーザー情報を取得
  const userInfo = await redis.get(
    `${CONSTANTS.REDIS_KEY.AUTH_TOKEN}:${sessionId}`
  );

  // ユーザー情報が取得できない場合、認証エラー
  if (!userInfo) return authErrorResponse();

  // 正常終了(認証OK)
  return successResponse(JSON.parse(userInfo));
}

async function del() {
  const sessionId = await getSessionId();

  // セッションIDが取得できない場合、認証エラー
  if (!sessionId) return authErrorResponse();

  // Redisからユーザー情報を削除
  const count = await redis.del(
    `${CONSTANTS.REDIS_KEY.AUTH_TOKEN}:${sessionId}`
  );

  // Redisの返却値が取得できない場合、認証エラー
  if (!count) return authErrorResponse();

  // 正常終了(認証OK)
  return successResponse({ status: "ok" });
}

// セッションID取得
async function getSessionId() {
  // cookieからトークンを取得
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.COOKIE_TOKEN ?? "");

  // cookieからトークンが取得できない場合、処理終了
  if (!token?.value) return null;

  // セッションID取得
  const payload = jwt.verify(token.value, process.env.JWT_SECRET);
  return payload.sessionId ?? null;
}
