// AP001Model ログイン照会API
"use server";
import apiClient from "@/app/model/api/APIModel";
import logger from "@/lib/logger";

const ifName = "AP001_ログイン照会API";

export async function ap001Model(state) {
  const { user_id, password } = state;

  try {
    const res = await apiClient.post("/auth/login", { user_id, password });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
