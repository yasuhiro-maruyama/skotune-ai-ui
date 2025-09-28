// B001_001_認証機能_ログイン照会BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B001_001_認証機能_ログイン照会BFF";

export async function b001001Model(state) {
  const { user_id, password } = state;

  try {
    const res = await bffClient.post("/auth/001", { user_id, password });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
