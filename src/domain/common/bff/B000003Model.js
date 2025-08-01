// B000003_コード値取得BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B000003_コード値取得BFF";

export async function b000003Model(state) {
  const { code_id } = state;

  try {
    const res = await bffClient.post("/common/code", { code_id });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
