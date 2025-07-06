// A003002_楽曲取得API Model
"use server";
import apiClient from "@/app/model/api/APIModel";
import logger from "@/lib/logger";

const ifName = "A003002_楽曲取得API";

export async function a003002Model(state) {
  const { artist_name, tune_name } = state;

  try {
    const res = await apiClient.post("/search/tune", {
      artist_name,
      tune_name,
    });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
