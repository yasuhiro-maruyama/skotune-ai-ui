// B004006_採点履歴更新BFF
"use server";
import { schema } from "@/schema/score/bff/B004006Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a004003Model } from "@/domain/score/api/A004003Model";
import { successResponse } from "@/lib/response";

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  // A004003_採点履歴更新API実行
  const result = await a004003Model(param);

  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // 正常終了
  return successResponse({ status: "ok" });
}
