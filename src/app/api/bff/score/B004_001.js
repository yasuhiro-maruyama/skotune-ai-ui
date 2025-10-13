// B004_001_採点機能_楽曲予約情報BFF
"use server";
import redis from "@/lib/redis";
import {
  getSchema,
  postSchema,
  deleteSchema,
} from "@/schema/score/bff/B004001Schema";
import { validateRequest } from "@/utils/apiUtils";
import * as CONSTANTS from "@/lib/apiConstants";
import { successResponse, notFoundMethodErrorResponse } from "@/lib/response";

const methods = {
  get: async (payload) => get(payload),
  post: async (payload) => post(payload),
  delete: async (payload) => del(payload),
};

export default async function B004_001(method, payload) {
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

  // Redisから楽曲予約情報を取得
  const result = await redis.hvals(
    `${CONSTANTS.REDIS_KEY.SCORE_RESERVATION}:${param.user_id}`
  );

  // 正常終了
  return successResponse(result.map((v) => JSON.parse(v)));
}

async function post(payload) {
  // バリデーションチェック
  const param = await validateRequest(postSchema, payload);
  if (param instanceof Response) return param;

  // Redisに予約情報を登録
  await redis.hset(
    `${CONSTANTS.REDIS_KEY.SCORE_RESERVATION}:${param.user_id}`,
    param.tune_id,
    JSON.stringify(param)
  );

  // 正常終了
  return successResponse({ status: "ok" });
}

async function del(payload) {
  // バリデーションチェック
  const param = await validateRequest(deleteSchema, payload);
  if (param instanceof Response) return param;

  // Redisの予約情報を削除
  await redis.hdel(
    `${CONSTANTS.REDIS_KEY.SCORE_RESERVATION}:${param.user_id}`,
    param.tune_id
  );

  // 正常終了
  return successResponse({ status: "ok" });
}
