"use client";
import { useState } from "react";
import menuModel from "@/app/model/domain/menuModel";

// ホーム画面
export default function Page() {
  const [activeTab, setActiveTab] = useState(0);
  const menu = menuModel((state) => state.menu);

  // DBから取得したキーで各コンポーネントの呼び出し
  const activeKey = menu?.[activeTab]?.content;

  return (
    <main>
      <div className="w-full h-screen relative overflow-hidden bg-white"></div>
    </main>
  );
}
