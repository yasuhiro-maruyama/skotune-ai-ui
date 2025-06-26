"use client";
import "./globals.css";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { bp002Model } from "@/app/model/bff/BP002Model";
import userModel from "@/app/model/domain/userModel";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function RootLayout({ children }) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const checkAuth = async () => {
      // トークン取得APIを実行
      const result = await bp002Model();
      // トークンがなければログイン画面へリダイレクト
      if (!result.success_flg) {
        router.push("/auth/login");
        return;
      }

      // ユーザー情報再保存
      userModel.getState().setUser(result.user_info);
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
