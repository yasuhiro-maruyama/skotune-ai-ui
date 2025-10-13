// B001_002_認証機能_トークン情報BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B001_002_認証機能_トークン情報BFF";

export async function b001002Model(method) {
  try {
    const res = await bffClient.post("/bff", {
      ifId: "B001_002",
      method,
      credentials: "include",
    });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
