// B004_001_採点機能_楽曲予約情報BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B004_001_採点機能_楽曲予約情報BFF";

export async function b004001Model(method, state) {
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
    const res = await bffClient.post("/bff", {
      ifId: "B004_001",
      method,
      payload: {
        user_id,
        artist_id,
        artist_name,
        tune_id,
        tune_name,
        model_type,
        score,
        scoring_date,
      },
    });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
