// B000_001_共通機能_メニュー機能取得BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B000_001_共通機能_メニュー機能取得BFF";

export async function b000001Model(state) {
  const { administrator_flg } = state;

  try {
    const res = await bffClient.get("/common/001", {
      params: { administrator_flg },
    });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
