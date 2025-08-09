"use client";
import Tab from "@/components/Tab";

const tabData = [
  {
    key: "search",
    label: "楽曲検索",
    content: <div>準備中です。</div>,
  },
  {
    key: "history",
    label: "履歴検索",
    content: <div>準備中です。</div>,
  },
];

// U003001_検索画面
export default function Page() {
  return (
    <main>
      <div className="page-item-all">
        <Tab tab={tabData} />
      </div>
    </main>
  );
}
