"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import userModel from "@/domain/common/store/userModel";
import menuModel from "@/domain/common/store/menuModel";
import reservationModel from "@/domain/score/store/score/reservationModel";
import { b000001Model } from "@/domain/common/bff/B000001Model";
import { b001002Model } from "@/domain/auth/bff/B001002Model";
import { b004001Model } from "@/domain/score/bff/B004001Model";
import * as CONSTANTS from "@/lib/apiConstants";

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
      // B001_002_認証機能_トークン情報BFF実行
      const b001002Result = await b001002Model(CONSTANTS.HTTP_METHOD.GET);
      if (!b001002Result.success_flg) {
        router.push("/auth/login");
        // ローディング完了
        setLoadingCompleted(true);
        return;
      }

      // ユーザー情報取得
      const userInfo = b001002Result.response_info;

      // B000_001_共通機能_メニュー情報BFF実行
      const b000001Result = await b000001Model(
        CONSTANTS.HTTP_METHOD.GET,
        userInfo
      );
      if (!b000001Result.success_flg) {
        router.push("/auth/login");
        // ローディング完了
        setLoadingCompleted(true);
        return;
      }

      // メニュー情報取得
      const menuInfo = b000001Result.response_info;
      // ユーザー情報再保存
      userModel.getState().setModel(userInfo);
      // メニュー情報設定
      menuModel.getState().setMenu(menuInfo);
      // 全てのメニュー機能の内容を取得
      const validPaths = menuInfo.map((item) => "/skotune" + item.content);

      // メニューに含まれていない遷移先の場合
      if (!validPaths.includes(pathname)) router.push("/skotune/home");

      // B004_001_採点機能_楽曲予約情報BFF実行
      const b004001Result = await b004001Model(CONSTANTS.HTTP_METHOD.GET, {
        user_id: userInfo.user_id,
      });

      // 異常終了
      if (!b004001Result.success_flg) {
        // ローディング完了
        setLoadingCompleted(true);
        return;
      }

      // 採点登録情報設定
      reservationModel.getState().setModel(
        b004001Result.response_info.map((item) => ({
          ...{
            model_type: null,
            score: 0.0,
            scoring_date: new Date().toISOString().slice(0, 10),
          },
          ...item,
        }))
      );

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
