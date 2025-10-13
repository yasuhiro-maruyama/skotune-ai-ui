// A004001_採点履歴登録API Model
"use server";
import apiClient from "@/lib/APIModel";
import logger from "@/lib/logger";

const ifName = "A004001_採点履歴登録API";

export async function getModel(state) {
  const { user_id, from_date, to_date } = state;

  try {
    const res = await apiClient.get("/score/001", {
      params: { user_id, from_date, to_date },
    });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}

export async function postModel(state) {
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
    const res = await apiClient.post("/score/001", {
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

export async function putModel(state) {
  const {
    user_id,
    tune_id,
    tune_name,
    model_type,
    score,
    scoring_date,
    registered_model_type,
    registered_scoring_date,
  } = state;

  try {
    const res = await apiClient.put("/score/001", {
      user_id,
      tune_id,
      tune_name,
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

export async function deleteModel(state) {
  const { user_id, tune_id, model_type, scoring_date } = state;

  try {
    const res = await apiClient.delete("/score/001", {
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
