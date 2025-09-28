// A000_001_共通機能_メニュー機能取得API Model
"use server";
import apiClient from "@/lib/APIModel";
import logger from "@/lib/logger";

const ifName = "A000_001_共通機能_メニュー機能取得API";

export async function a000001Model(state) {
  const { administrator_flg } = state;

  try {
    const res = await apiClient.get("/common/001", {
      params: { administrator_flg },
    });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
