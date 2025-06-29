// B001001_ログイン照会BFF Model
"use client";
import bffClient from "@/app/model/bff/BFFModel";

const ifName = "B001001_ログイン照会BFF";

export async function b001001Model(state) {
  const { user_id, password } = state;

  try {
    const res = await bffClient.post("/auth/login", { user_id, password });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
