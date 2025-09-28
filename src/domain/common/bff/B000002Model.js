// B000_002_共通機能_コード値取得BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B000_002_共通機能_コード値取得BFF";

export async function b000002Model(state) {
  const { code_id } = state;

  try {
    const res = await bffClient.get("/common/002", { params: { code_id } });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
