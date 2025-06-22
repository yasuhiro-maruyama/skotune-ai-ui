// BFFModel
"use client";
import axios from "axios";
import { CONTENT_TYPE } from "@/lib/apiConstants";

const bffClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BFF_BASE_URL,
  headers: {
    "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
  },
  withCredentials: true,
});

// レスポンスの処理（エラー共通処理など）
bffClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 400系のエラーは正常系として各BFFモデルに返却
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

export default bffClient;
