// A003001_歌手取得API Model
"use server";
import apiClient from "@/app/model/api/APIModel";
import logger from "@/lib/logger";

const ifName = "A003001_歌手取得API";

export async function a003001Model(state) {
  const { artist_name } = state;

  try {
    const res = await apiClient.post("/search/artist", { artist_name });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
