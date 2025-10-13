// B004_002_採点機能_採点履歴情報BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B004_002_採点機能_採点履歴情報BFF";

export async function b004002Model(method, state) {
  const {
    user_id,
    from_date,
    to_date,
    artist_id,
    artist_name,
    tune_id,
    tune_name,
    model_type,
    score,
    scoring_date,
    registered_model_type,
    registered_scoring_date,
  } = state;

  try {
    const res = await bffClient.post("/bff", {
      ifId: "B004_002",
      method,
      payload: {
        user_id,
        from_date,
        to_date,
        artist_id,
        artist_name,
        tune_id,
        tune_name,
        model_type,
        score,
        scoring_date,
        registered_model_type,
        registered_scoring_date,
      },
    });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
