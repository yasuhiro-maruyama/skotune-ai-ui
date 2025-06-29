"use client";
import "./globals.css";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import userModel from "@/app/model/domain/userModel";
import menuModel from "@/app/model/domain/menuModel";
import { b001002Model } from "@/app/model/bff/B001002Model";

export default function RootLayout({ children }) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const checkAuth = async () => {
      // トークン取得BFF実行
      const result = await b001002Model();
      // トークンがなければログイン画面へリダイレクト
      if (!result.success_flg) {
        router.push("/auth/login");
        return;
      }

      // ユーザー情報再保存
      userModel.getState().setUser(result.response_info.user_info);
      // メニュー情報設定
      menuModel.getState().setMenu(result.response_info.menu_info);
      // ホーム画面に遷移
      isMobile ? router.push("/home/mobile") : router.push("/home");
    };
    checkAuth();
  }, [router, isMobile]);

  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
