// B000_002_共通機能_コード値情報BFF
"use server";
import redis from "@/lib/redis";
import { getSchema } from "@/schema/common/bff/B000002Schema";
import { validateRequest } from "@/utils/apiUtils";
import * as A000002Model from "@/domain/common/api/A000002Model";
import { REDIS_KEY } from "@/lib/apiConstants";
import {
  successResponse,
  notFoundMethodErrorResponse,
  internalServerErrorResponse,
} from "@/lib/response";

const methods = {
  get: async (payload) => get(payload),
};

export default async function B000_002(method, payload) {
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

  // コード値のフィルター
  const codeIdFilter = (item) => item.code_id === param.code_id;

  // Redisからキャッシュ情報を取得
  const cache = await redis.get(REDIS_KEY.COMMON_CODE);
  // キャッシュ情報返却
  if (cache) return successResponse(JSON.parse(cache).filter(codeIdFilter));

  // A000_002_共通機能_コード値取得API実行
  const result = await A000002Model.getModel();
  if (!result.success_flg) return internalServerErrorResponse();

  // キャッシュ保存
  const response_info = result.response_info;
  redis.set(REDIS_KEY.COMMON_CODE, JSON.stringify(response_info));

  // 正常終了
  return successResponse(response_info.filter(codeIdFilter));
}
