// B000_001_共通機能_メニュー情報BFF
"use server";
import redis from "@/lib/redis";
import { getSchema } from "@/schema/common/bff/B000001Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a000001Model } from "@/domain/common/api/A000001Model";
import { REDIS_KEY } from "@/lib/apiConstants";
import {
  successResponse,
  notFoundMethodErrorResponse,
  internalServerErrorResponse,
} from "@/lib/response";

const methods = {
  get: async (payload) => get(payload),
};

export default async function B000_001(method, payload) {
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

  // 一般ユーザーの管理者権限の除外
  const administratorFlgFilter = (item) => item.administrator_flg === false;

  // Redisからキャッシュ情報を取得
  const cache = await redis.get(REDIS_KEY.COMMON_MENU);
  if (cache) {
    const menuList = JSON.parse(cache);

    // キャッシュ情報返却
    return successResponse(
      param.administrator_flg
        ? menuList
        : menuList.filter(administratorFlgFilter)
    );
  }

  // A000_001_共通機能_メニュー機能取得API実行
  const result = await a000001Model();
  if (!result.success_flg) return internalServerErrorResponse();

  // キャッシュ保存
  const response_info = result.response_info;
  redis.set(REDIS_KEY.COMMON_MENU, JSON.stringify(response_info));

  // 正常終了
  return successResponse(
    param.administrator_flg
      ? response_info
      : response_info.filter(administratorFlgFilter)
  );
}
