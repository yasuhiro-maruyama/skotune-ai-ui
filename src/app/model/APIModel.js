// APIModel
import axios from "axios";
import { CONTENT_TYPE } from "@/lib/apiConstants";

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
  },
  withCredentials: true,
});

// レスポンス後の処理（エラー共通処理など）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "通信エラーが発生しました";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
