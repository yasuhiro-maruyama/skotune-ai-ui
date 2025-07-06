// A003003_全楽曲取得API Model
"use server";
import apiClient from "@/app/model/api/APIModel";
import logger from "@/lib/logger";

const ifName = "A003003_全楽曲取得API";

export async function a003003Model(state) {
  const { artist_id } = state;

  try {
    const res = await apiClient.post("/search/artist/tune", { artist_id });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
