// B004_002_採点機能_採点履歴情報BFF
"use server";
import redis from "@/lib/redis";
import {
  getSchema,
  postSchema,
  putSchema,
  deleteSchema,
} from "@/schema/score/bff/B004002Schema";
import { validateRequest } from "@/utils/apiUtils";
import * as A004001Model from "@/domain/score/api/A004001Model";
import * as CONSTANTS from "@/lib/apiConstants";
import {
  successResponse,
  notFoundMethodErrorResponse,
  internalServerErrorResponse,
} from "@/lib/response";

const methods = {
  get: async (payload) => get(payload),
  post: async (payload) => post(payload),
  put: async (payload) => put(payload),
  delete: async (payload) => del(payload),
};

export default async function B004_002(method, payload) {
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
  const cache = await redis.get(
    `${CONSTANTS.REDIS_KEY.SCORE_HISTORY}:${param.user_id}`
  );
  // キャッシュ情報返却
  if (cache) return successResponse(JSON.parse(cache));

  // TODO:開始日と終了日の抽出はここでする。(APIの引数は削除予定)

  // A004_001_採点機能_採点履歴取得API実行
  const result = await A004001Model.getModel(param);

  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // キャッシュ保存
  const response_info = result.response_info;
  redis.set(
    `${CONSTANTS.REDIS_KEY.SCORE_HISTORY}:${param.user_id}`,
    JSON.stringify(response_info)
  );

  // 正常終了
  return successResponse(response_info);
}

async function post(payload) {
  // バリデーションチェック
  const param = await validateRequest(postSchema, payload);
  if (param instanceof Response) return param;

  // A004_001_採点機能_採点履歴登録API実行
  const result = await A004001Model.postModel(param);

  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // 正常終了
  return successResponse({ status: "ok" });
}

async function put(payload) {
  // バリデーションチェック
  const param = await validateRequest(putSchema, payload);
  if (param instanceof Response) return param;

  // A004_001_採点機能_採点履歴更新API実行
  const result = await A004001Model.putModel(param);

  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // 正常終了
  return successResponse({ status: "ok" });
}

async function del(payload) {
  // バリデーションチェック
  const param = await validateRequest(deleteSchema, payload);
  if (param instanceof Response) return param;

  // A004_001_採点機能_採点履歴削除API実行
  const result = await A004001Model.deleteModel(param);

  // 異常終了の場合、内部サーバーエラー
  if (!result.success_flg) return internalServerErrorResponse();

  // 正常終了
  return successResponse({ status: "ok" });
}
