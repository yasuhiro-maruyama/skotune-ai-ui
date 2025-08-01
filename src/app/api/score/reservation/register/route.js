// B004002_楽曲予約登録BFF
"use server";
import redis from "@/lib/redis";
import { schema } from "@/validators/score/B004002Schema";
import { validateRequest } from "@/utils/apiUtils";
import { successResponse } from "@/lib/response";

const CASH_TIME = 60 * 60 * 24 * 30; // 予約の保存期間(１ヶ月)

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  // Redisに予約情報を保存
  await redis.set(
    `score_reservation:${param.user_id}_${param.tune_id}`,
    JSON.stringify(param),
    { ex: CASH_TIME }
  );

  // 正常終了
  return successResponse(null);
}
