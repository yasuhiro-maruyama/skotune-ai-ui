// A004004_採点履歴削除API Model
"use server";
import apiClient from "@/lib/APIModel";
import logger from "@/lib/logger";

const ifName = "A004004_採点履歴削除API";

export async function a004004Model(state) {
  const { user_id, tune_id, model_type, scoring_date } = state;

  try {
    const res = await apiClient.post("/score/delete", {
      user_id,
      tune_id,
      model_type,
      scoring_date,
    });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
