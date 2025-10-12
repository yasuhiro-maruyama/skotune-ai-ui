"use server";
import { successResponse, notFoundIfIdErrorResponse } from "@/lib/response";
import { Routes } from "@/app/api/bff/routes";

// B000_000_共通機能_ヘルスチェックBFF
export async function GET() {
  return successResponse({ status: "ok" });
}

// BFF統合エンドポイント
export async function POST(req) {
  const { ifId, method, payload } = await req.json();

  // IFIDに対応するハンドラを取得
  const handler = Routes[ifId];

  // ハンドラが取得できない場合、404エラーを返却
  if (!handler) return notFoundIfIdErrorResponse();

  // 各IFのハンドラ呼び出し
  return await handler(method, payload);
}
