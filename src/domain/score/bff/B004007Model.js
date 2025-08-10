// B004007_採点履歴削除BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B004007_採点履歴削除BFF";

export async function b004007Model(state) {
  const { user_id, tune_id, model_type, scoring_date } = state;

  try {
    const res = await bffClient.post("/score/delete", {
      user_id,
      tune_id,
      model_type,
      scoring_date,
    });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
