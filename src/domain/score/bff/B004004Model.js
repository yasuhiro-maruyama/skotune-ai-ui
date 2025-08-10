// B004004_楽曲予約削除BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B004004_楽曲予約削除BFF";

export async function b004004Model(state) {
  const { user_id, tune_id } = state;

  try {
    const res = await bffClient.post("/score/reservation/delete", {
      user_id,
      tune_id,
    });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
