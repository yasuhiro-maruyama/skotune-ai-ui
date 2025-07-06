// A001001_ログイン照会API Model
"use server";
import apiClient from "@/app/model/api/APIModel";
import logger from "@/lib/logger";

const ifName = "A001001_ログイン照会API";

export async function a001001Model(state) {
  const { user_id, password } = state;

  try {
    const res = await apiClient.post("/auth/login", { user_id, password });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
