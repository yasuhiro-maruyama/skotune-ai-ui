"use client";
import Tab from "@/components/Tab";

const tabData = [
  {
    key: "system_setting",
    label: "システム設定",
    content: <div>準備中です。</div>,
  },
  {
    key: "tune_setting",
    label: "楽曲設定",
    content: <div>準備中です。</div>,
  },
  {
    key: "link",
    label: "リンク集",
    content: <div>準備中です。</div>,
  },
];

// U007001_管理者画面
export default function Page() {
  return (
    <main>
      <div className="page-item-all">
        <Tab tab={tabData} />
      </div>
    </main>
  );
}
