// B000_001_共通機能_メニュー機能取得BFF
"use server";
import redis from "@/lib/redis";
import { schema } from "@/schema/common/bff/B000001Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a000001Model } from "@/domain/common/api/A000001Model";
import { REDIS_KEY } from "@/lib/apiConstants";
import { successResponse, internalServerErrorResponse } from "@/lib/response";

export async function GET(req) {
  // バリデーションチェック
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries());

  const param = await validateRequest(schema, query);
  if (param instanceof Response) return param;

  const administrator_flg = String(param.administrator_flg);

  // Redisからキャッシュ情報を取得
  const cache =
    !param.administrator_flg &&
    (await redis.hget(REDIS_KEY.COMMON_MENU, administrator_flg));
  if (cache) return successResponse(JSON.parse(cache));

  // A000_001_共通機能_メニュー機能取得API実行
  const result = await a000001Model(param);
  if (!result.success_flg) return internalServerErrorResponse();

  // キャッシュ保存
  redis.hset(
    REDIS_KEY.COMMON_MENU,
    administrator_flg,
    JSON.stringify(result.response_info)
  );

  // 正常終了
  return successResponse(result.response_info);
}
