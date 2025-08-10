// B004001_採点履歴登録BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B004001_採点履歴登録BFF";

export async function b004001Model(state) {
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
    const res = await bffClient.post("/score/register", {
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
    return { success_flg: false };
  }
}
