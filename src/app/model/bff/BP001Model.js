// BP001Model ログイン照会BFF
"use client";
import apiClient from "@/app/model/bff/BFFModel";

const ifName = "BP001_ログイン照会BFF";

export async function bp001Model(state) {
  const { user_id, password } = state;

  try {
    const res = await apiClient.post("/auth/login", { user_id, password });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
