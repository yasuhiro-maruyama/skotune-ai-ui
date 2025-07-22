// A000004_メニュー機能取得API Model
"use server";
import apiClient from "@/app/model/api/APIModel";
import logger from "@/lib/logger";

const ifName = "A000004_メニュー機能取得API";

export async function a000004Model(state) {
  const { administrator_flg } = state;

  try {
    const res = await apiClient.post("/common/menu", { administrator_flg });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
