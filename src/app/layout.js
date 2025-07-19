"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import userModel from "@/app/model/domain/userModel";
import menuModel from "@/app/model/domain/menuModel";
import { b001002Model } from "@/app/model/bff/auth/B001002Model";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  useEffect(() => {
    const authUnnecessary = ["/docs", "/auth/login", "/auth/user"];

    // 認証不要画面は認証処理をせず、ローディング完了にする
    if (authUnnecessary.includes(pathname)) {
      setLoadingCompleted(true);
      return;
    }

    const checkAuth = async () => {
      // トークン取得BFF実行
      const result = await b001002Model();
      // トークンがなければログイン画面へリダイレクト
      if (!result.success_flg) {
        router.push("/auth/login");
        // ローディング完了
        setLoadingCompleted(true);
        return;
      }

      // ユーザー情報再保存
      userModel.getState().setUser(result.response_info.user_info);
      // メニュー情報設定
      menuModel.getState().setMenu(result.response_info.menu_info);
      // ホーム画面に遷移
      isMobile ? router.push("/home/mobile") : router.push("/home");
      // ローディング完了
      setLoadingCompleted(true);
      return;
    };

    checkAuth();
  }, [router, isMobile, pathname]);

  return (
    <html lang="en">
      <body>
        {loadingCompleted ? (
          <>
            {children}
            <Toaster position="top-center" richColors />
          </>
        ) : (
          <div className="w-screen h-screen flex items-center justify-center">
            <p>読み込み中...</p>
          </div>
        )}
      </body>
    </html>
  );
}
