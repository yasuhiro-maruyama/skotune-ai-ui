// B004003_楽曲予約取得BFF
"use server";
import { schema } from "@/schema/score/bff/B004003Schema";
import { validateRequest, redisScan } from "@/utils/apiUtils";
import { successResponse } from "@/lib/response";

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  // Redisから楽曲予約情報を取得
  const result = await redisScan(`score_reservation:${param.user_id}`);

  // 正常終了
  return successResponse(result);
}
