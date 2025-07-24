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
  const menu = menuModel((state) => state.menu);

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

      // メニュー情報取得
      const menuInfo = result.response_info.menu_info;
      // ユーザー情報再保存
      userModel.getState().setUser(result.response_info.user_info);
      // メニュー情報設定
      menuModel.getState().setMenu(menuInfo);
      // 全てのメニュー機能の内容を取得
      const validPaths = menuInfo.map((item) => "/skotune" + item.content);

      // メニューに含まれていない遷移先の場合
      if (!validPaths.includes(pathname)) {
        // ホーム画面に遷移
        isMobile
          ? router.push("/skotune/home/mobile")
          : router.push("/skotune/home");
      }
      // ローディング完了
      setLoadingCompleted(true);
      return;
    };

    checkAuth();
  }, [router, isMobile, pathname]);

  return (
    <html lang="ja">
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
