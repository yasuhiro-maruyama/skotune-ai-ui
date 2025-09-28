// B000_002_共通機能_コード値取得BFF
"use server";
import redis from "@/lib/redis";
import { schema } from "@/schema/common/bff/B000002Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a000002Model } from "@/domain/common/api/A000002Model";
import { REDIS_KEY } from "@/lib/apiConstants";
import { successResponse, internalServerErrorResponse } from "@/lib/response";

export async function GET(req) {
  // バリデーションチェック
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries());

  const param = await validateRequest(schema, query);
  if (param instanceof Response) return param;

  // Redisからキャッシュ情報を取得
  const cache = await redis.hget(REDIS_KEY.COMMON_CODE, param.code_id);
  if (cache) return successResponse(JSON.parse(cache));

  // A000_002_共通機能_コード値取得API実行
  const result = await a000002Model(param);
  if (!result.success_flg) return internalServerErrorResponse();

  // キャッシュ保存
  redis.hset(
    REDIS_KEY.COMMON_CODE,
    param.code_id,
    JSON.stringify(result.response_info)
  );

  // 正常終了
  return successResponse(result.response_info);
}
