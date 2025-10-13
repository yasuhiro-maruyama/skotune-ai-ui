// B003_002_検索機能_全楽曲情報BFF
"use server";
import redis from "@/lib/redis";
import { getSchema } from "@/schema/search/bff/B003002Schema";
import { validateRequest } from "@/utils/apiUtils";
import * as A003003Model from "@/domain/search/api/A003003Model";
import * as CONSTANTS from "@/lib/apiConstants";
import {
  successResponse,
  notFoundMethodErrorResponse,
  internalServerErrorResponse,
} from "@/lib/response";

const CASH_TIME = 60 * 60 * 24; // 楽曲情報の保存期間(24時間)

const methods = {
  get: async (payload) => get(payload),
};

export default async function B003_002(method, payload) {
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

  // Redisからキャッシュ情報を取得
  const cache = await redis.get(param.artist_id);
  // キャッシュ情報返却
  if (cache) return successResponse(JSON.parse(cache));

  // A003_003_検索機能_全楽曲取得API実行
  const result = await A003003Model.getModel(param);
  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // キャッシュ保存
  const response_info = result.response_info;
  redis.set(
    param.artist_id,
    JSON.stringify(response_info),
    CONSTANTS.REDIS_OPTION.EXPIRE,
    CASH_TIME
  );

  // 正常終了
  return successResponse(response_info);
}
