// APIModel
"use server";
import axios from "axios";
import { CONTENT_TYPE } from "@/lib/apiConstants";

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
  },
  withCredentials: true,
});

// レスポンスの処理（エラー共通処理など）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 400系のエラーは正常系として各APIモデルに返却
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      return Promise.resolve(error.response);
    }
    // それ以外のエラーはrejectして例外として処理する
    return Promise.reject(error);
  }
);

export default apiClient;
