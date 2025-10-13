// B003_001_検索機能_楽曲情報BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B003_001_検索機能_楽曲情報BFF";

export async function b003001Model(method, state) {
  const { artist_name, tune_name } = state;

  try {
    const res = await bffClient.post("/bff", {
      ifId: "B003_001",
      method,
      payload: {
        artist_name,
        tune_name,
      },
    });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
