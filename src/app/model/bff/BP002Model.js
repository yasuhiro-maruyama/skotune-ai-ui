// BP002Model トークン取得BFF
"use client";
import apiClient from "@/app/model/bff/BFFModel";

const ifName = "BP002_トークン取得BFF";

export async function bp002Model() {
  try {
    const res = await apiClient.post("/auth/token", { credentials: "include" });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
