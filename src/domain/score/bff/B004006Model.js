// B004006_採点履歴更新BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B004006_採点履歴更新BFF";

export async function b004006Model(state) {
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
    const res = await bffClient.post("/score/update", {
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
    return { success_flg: false };
  }
}
