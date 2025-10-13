// B000_002_共通機能_コード値情報BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B000_002_共通機能_コード値情報BFF";

export async function b000002Model(method, state) {
  const { code_id } = state;

  try {
    const res = await bffClient.post("/bff", {
      ifId: "B000_002",
      method,
      payload: { code_id },
    });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
