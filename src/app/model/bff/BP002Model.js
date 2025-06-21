// BP002Model トークン取得BFF
"use server";
import apiClient from "@/app/model/bff/BFFModel";
import logger from "@/lib/logger";

const ifName = "BP002_トークン取得BFF";

export async function bp002Model() {
  try {
    const res = await apiClient.post("/auth/token", { credentials: "include" });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
