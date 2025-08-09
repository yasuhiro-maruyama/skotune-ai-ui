"use client";
import Tab from "@/components/Tab";

const tabData = [
  {
    key: "spotify",
    label: "Spotify生成",
    content: <div>準備中です。</div>,
  },
  {
    key: "manual",
    label: "手動生成",
    content: <div>準備中です。</div>,
  },
  {
    key: "auto",
    label: "自動生成",
    content: <div>準備中です。</div>,
  },
];

// U006001_マイリスト画面
export default function Page() {
  return (
    <main>
      <div className="page-item-all">
        <Tab tab={tabData} />
      </div>
    </main>
  );
}
