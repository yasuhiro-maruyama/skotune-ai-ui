// BFFModel
import axios from "axios";
import { CONTENT_TYPE } from "@/lib/apiConstants";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BFF_BASE_URL,
  headers: {
    "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
  },
  withCredentials: true,
});

// リクエスト前に何か処理したい場合（例：トークン自動付与）
apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
