// B000003_コード値取得BFF
"use server";
import { schema } from "@/validators/common/B000003Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a000005Model } from "@/app/model/api/common/A000005Model";
import { successResponse, internalServerErrorResponse } from "@/lib/response";

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  // A000005_コード値取得API実行
  const result = await a000005Model(param);
  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // 正常終了
  return successResponse(result.response_info);
}
