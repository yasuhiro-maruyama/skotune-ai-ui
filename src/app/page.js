"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { bp002Model } from "@/app/model/bff/BP002Model";
import userModel from "@/app/model/userModel";

// ホーム画面
export default function Page() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // トークン取得APIを実行
      const result = await bp002Model();
      // トークンがなければログイン画面へリダイレクト
      if (!result.success_flg) {
        router.push("/auth/login");
        return;
      }

      // 認証OK
      setAuthChecked(true);
      // ユーザー情報再保存
      userModel.getState().setUser(result.user_info);
    };
    checkAuth();
  }, [router]);

  // 認証されていない場合、何もしない
  if (!authChecked) return null;

  return (
    <main>
      <h1>ようこそ、ホーム画面へ！</h1>
    </main>
  );
}
