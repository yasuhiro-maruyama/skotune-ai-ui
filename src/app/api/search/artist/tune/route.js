// B003002_全楽曲取得BFF
"use server";
import redis from "@/lib/redis";
import { schema } from "@/validators/search/B003002Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a003003Model } from "@/app/model/api/search/A003003Model";
import { successResponse, internalServerErrorResponse } from "@/lib/response";

const CASH_TIME = 60 * 60 * 24; // 楽曲情報の保存期間(24時間)

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  let result;

  // Redisから楽曲情報を取得
  result = await redis.get(param.artist_id);

  // Redisから取得できない場合、APIから取得
  if (!result) {
    // 全楽曲取得API実行
    result = await a003003Model(param);
    // 異常終了の場合、内部サーバーエラー
    if (!result.success_flg) return internalServerErrorResponse();

    // Redisに楽曲情報を保存
    await redis.set(param.artist_id, JSON.stringify(result), { ex: CASH_TIME });
  }

  // 正常終了
  return successResponse(result.response_info);
}
