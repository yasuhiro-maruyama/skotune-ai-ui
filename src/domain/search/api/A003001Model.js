// A003_001_検索機能_歌手取得API Model
"use server";
import apiClient from "@/lib/APIModel";
import logger from "@/lib/logger";

const ifName = "A003_001_検索機能_歌手取得API";

export async function getModel(state) {
  const { artist_name } = state;

  try {
    const res = await apiClient.get("/search/001", {
      params: { artist_name },
    });

    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
