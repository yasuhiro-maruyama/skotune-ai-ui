// B004004_楽曲予約削除BFF
"use server";
import redis from "@/lib/redis";
import { schema } from "@/schema/score/bff/B004004Schema";
import { validateRequest } from "@/utils/apiUtils";
import { successResponse } from "@/lib/response";

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  // Redisの予約情報を削除
  await redis.del(`score_reservation:${param.user_id}_${param.tune_id}`);

  // 正常終了
  return successResponse({ status: "ok" });
}
