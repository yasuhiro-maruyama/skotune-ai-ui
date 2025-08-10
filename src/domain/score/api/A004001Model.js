// A004001_採点履歴登録API Model
"use server";
import apiClient from "@/lib/APIModel";
import logger from "@/lib/logger";

const ifName = "A004001_採点履歴登録API";

export async function a004001Model(state) {
  const {
    user_id,
    artist_id,
    artist_name,
    tune_id,
    tune_name,
    model_type,
    score,
    scoring_date,
  } = state;

  try {
    const res = await apiClient.post("/score/register", {
      user_id,
      artist_id,
      artist_name,
      tune_id,
      tune_name,
      model_type,
      score,
      scoring_date,
    });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
