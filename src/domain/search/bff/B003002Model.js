// B003_002_検索機能_全楽曲情報BFF Model
"use client";
import bffClient from "@/lib/BFFModel";

const ifName = "B003_002_検索機能_全楽曲情報BFF";

export async function b003002Model(method, state) {
  const { artist_id } = state;

  try {
    const res = await bffClient.post("/bff", {
      ifId: "B003_002",
      method,
      payload: { artist_id },
    });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
