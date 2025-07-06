// B003001_楽曲検索BFF Model
"use client";
import bffClient from "@/app/model/bff/BFFModel";

const ifName = "B003001_楽曲検索BFF";

export async function b003001Model(state) {
  const { artist_name, tune_name } = state;

  try {
    const res = await bffClient.post("/search/tune", {
      artist_name,
      tune_name,
    });
    return res.data;
  } catch (err) {
    return { success_flg: false };
  }
}
