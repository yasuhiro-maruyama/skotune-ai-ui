// A004003_採点履歴更新API Model
"use server";
import apiClient from "@/lib/APIModel";
import logger from "@/lib/logger";

const ifName = "A004003_採点履歴更新API";

export async function a004003Model(state) {
  const {
    user_id,
    tune_id,
    model_type,
    score,
    scoring_date,
    registered_model_type,
    registered_scoring_date,
  } = state;

  try {
    const res = await apiClient.post("/score/update", {
      user_id,
      tune_id,
      model_type,
      score,
      scoring_date,
      registered_model_type,
      registered_scoring_date,
    });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
