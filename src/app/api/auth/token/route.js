// B001002_トークン取得BFF
"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis";
import { HTTP_STATUS, RESPONSE_CODE } from "@/lib/apiConstants";
import { a001002Model } from "@/app/model/api/A001002Model";
import {
  successResponse,
  internalServerErrorResponse,
  authErrorResponse,
} from "@/lib/response";

export async function POST() {
  // cookieからトークンを取得
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.COOKIE_TOKEN);

  // cookieからトークンが取得できない場合、認証エラー
  if (!token || !token.value) return authErrorResponse();

  // セッションID取得
  const payload = jwt.verify(token.value, process.env.JWT_SECRET);
  const sessionId = payload.sessionId;

  // セッションIDが取得できない場合、認証エラー
  if (!payload || !payload.sessionId) return authErrorResponse();

  // Redisからユーザー情報を取得
  const userInfo = await redis.get(sessionId);

  // ユーザー情報が取得できない場合、認証エラー
  if (!userInfo) return authErrorResponse();

  // メニュー機能取得API実行
  const result = await a001002Model({
    administrator_flg: userInfo.administrator_flg,
  });

  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // 正常終了(認証OK)
  return successResponse({
    user_info: userInfo,
    menu_info: result.response_info,
  });
}
