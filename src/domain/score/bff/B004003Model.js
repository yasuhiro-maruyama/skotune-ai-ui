// B004003_楽曲予約取得BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B004003_楽曲予約取得BFF";

export async function b004003Model(state) {
  const { user_id } = state;

  try {
    const res = await bffClient.post("/score/reservation/get", { user_id });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
