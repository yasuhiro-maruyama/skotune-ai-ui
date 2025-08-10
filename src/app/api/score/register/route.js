// B004001_採点履歴登録BFF
"use server";
import { schema } from "@/schema/score/bff/B004001Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a004001Model } from "@/domain/score/api/A004001Model";
import { successResponse } from "@/lib/response";

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  // A004001_採点履歴登録API実行
  const result = await a004001Model(param);

  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // 正常終了
  return successResponse({ status: "ok" });
}
