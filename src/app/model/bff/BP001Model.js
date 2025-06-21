// BP001Model ログイン照会BFF
"use server";
import apiClient from "@/app/model/bff/BFFModel";
import logger from "@/lib/logger";

const ifName = "BP001_ログイン照会BFF";

export async function bp001Model(state) {
  const { user_id, password } = state;

  try {
    const res = await apiClient.post("/auth/login", { user_id, password });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
