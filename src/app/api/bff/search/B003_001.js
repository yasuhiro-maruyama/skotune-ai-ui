// B003_001_検索機能_楽曲情報BFF
"use server";
import { getSchema } from "@/schema/search/bff/B003001Schema";
import { validateRequest } from "@/utils/apiUtils";
import * as A003001Model from "@/domain/search/api/A003001Model";
import * as A003002Model from "@/domain/search/api/A003002Model";
import {
  successResponse,
  notFoundMethodErrorResponse,
  internalServerErrorResponse,
} from "@/lib/response";

const methods = {
  get: async (payload) => get(payload),
};

export default async function B003_001(method, payload) {
  const handler = methods[method]?.(payload);
  // ハンドラが取得できない場合、404エラーを返却
  if (!handler) return notFoundMethodErrorResponse();

  // レスポンス返却
  return handler;
}

async function get(payload) {
  // バリデーションチェック
  const param = await validateRequest(getSchema, payload);
  if (param instanceof Response) return param;

  const [a003001Result, a003002Result] = await Promise.all([
    param.artist_name ? A003001Model.getModel(param) : Promise.resolve(null),
    A003002Model.getModel(param),
  ]);

  if (
    (a003001Result && !a003001Result.success_flg) ||
    !a003002Result.success_flg
  )
    return internalServerErrorResponse();

  // 正常終了
  return successResponse({
    artist_info: a003001Result?.response_info ?? null,
    tune_info: a003002Result.response_info,
  });
}
