// A001_001_認証機能_ログイン照会API Model
"use server";
import apiClient from "@/lib/APIModel";
import logger from "@/lib/logger";

const ifName = "A001_001_認証機能_ログイン照会API";

export async function a001001Model(state) {
  const { user_id, password } = state;

  try {
    const res = await apiClient.post("/auth/001", { user_id, password });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
