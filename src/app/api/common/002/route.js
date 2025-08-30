// B000_002_共通機能_コード値取得BFF
"use server";
import { schema } from "@/schema/common/bff/B000002Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a000002Model } from "@/domain/common/api/A000002Model";
import { successResponse, internalServerErrorResponse } from "@/lib/response";

export async function GET(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  // A000_002_共通機能_コード値取得API実行
  const result = await a000002Model(param);
  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // 正常終了
  return successResponse(result.response_info);
}
