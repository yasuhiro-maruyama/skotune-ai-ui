// B003002_全楽曲取得BFF Model
"use client";
import bffClient from "@/app/model/bff/BFFModel";

const ifName = "B003002_全楽曲取得BFF";

export async function b003002Model(state) {
  const { artist_id } = state;

  try {
    const res = await bffClient.post("/search/artist/tune", { artist_id });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
