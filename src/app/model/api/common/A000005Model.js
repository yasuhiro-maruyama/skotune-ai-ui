// A000005_コード値取得API Model
"use server";
import apiClient from "@/app/model/api/APIModel";
import logger from "@/lib/logger";

const ifName = "A000005_コード値取得API";

export async function a000005Model(state) {
  const { code_id } = state;

  try {
    const res = await apiClient.post("/common/code", { code_id });
    return res.data;
  } catch (err) {
    logger.error(ifName + "で通信エラーが発生しました。", err.msseage);
    return { success_flg: false };
  }
}
