// Next.js API Route(トークン取得BFF) BP002
"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis";
import { HTTP_STATUS, RESPONSE_CODE, CONTENT_TYPE } from "@/lib/apiConstants";
import { API_MSG } from "@/lib/messages";

export async function POST() {
  // 認証エラーレスポンス
  const authResponse = {
    success_flg: false,
    code: RESPONSE_CODE.AUTH_ERROR,
    message: API_MSG.authError,
  };

  // cookieからトークンを取得
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.COOKIE_TOKEN);

  // cookieからトークンが取得できない場合、認証エラー
  if (!token || !token.value) {
    return NextResponse.json(authResponse, {
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  }

  const payload = jwt.verify(token.value, process.env.JWT_SECRET);
  const sessionId = payload.sessionId;

  // セッションIDが取得できない場合、認証エラー
  if (!payload || !payload.sessionId) {
    return NextResponse.json(authResponse, {
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  }

  // Redisからユーザー情報を取得
  const userInfo = await redis.get(sessionId);

  // ユーザー情報が取得できない場合、認証エラー
  if (!userInfo) {
    return NextResponse.json(authResponse, {
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  }

  // 正常終了(認証OK)
  return NextResponse.json(
    {
      success_flg: true,
      code: RESPONSE_CODE.SUCCESS,
      message: null,
      user_info: userInfo,
    },
    {
      status: HTTP_STATUS.OK,
    }
  );
}
