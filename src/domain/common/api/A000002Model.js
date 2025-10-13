// A000_002_共通機能_コード値取得API Model
"use server";
import apiClient from "@/lib/APIModel";
import logger from "@/lib/logger";

const ifName = "A000_002_共通機能_コード値取得API";

export async function getModel() {
  try {
    const res = await apiClient.get("/common/002", {});
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
