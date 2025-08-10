// B004007_採点履歴削除BFF
"use server";
import { schema } from "@/schema/score/bff/B004007Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a004004Model } from "@/domain/score/api/A004004Model";
import { successResponse } from "@/lib/response";

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  // A004003_採点履歴削除API実行
  const result = await a004004Model(param);

  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // 正常終了
  return successResponse({ status: "ok" });
}
