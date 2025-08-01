// B004002_楽曲予約登録BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B004002_楽曲予約登録BFF";

export async function b004002Model(state) {
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
    const res = await bffClient.post("/score/reservation/register", {
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
