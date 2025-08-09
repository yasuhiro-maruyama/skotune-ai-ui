"use client";
import Tab from "@/components/Tab";

const tabData = [
  {
    key: "user",
    label: "ユーザー設定",
    content: <div>準備中です。</div>,
  },
  {
    key: "model",
    label: "AI設定",
    content: <div>準備中です。</div>,
  },
];

// U008001_設定画面
export default function Page() {
  return (
    <main>
      <div className="page-item-all">
        <Tab tab={tabData} />
      </div>
    </main>
  );
}
