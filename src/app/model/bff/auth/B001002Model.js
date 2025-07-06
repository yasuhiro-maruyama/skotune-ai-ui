// B001002_トークン取得BFF Model
"use client";
import bffClient from "@/app/model/bff/BFFModel";

const ifName = "B001002_トークン取得BFF";

export async function b001002Model() {
  try {
    const res = await bffClient.post("/auth/token", { credentials: "include" });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
