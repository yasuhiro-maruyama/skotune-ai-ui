"use client";
import Tab from "@/components/Tab";

const tabData = [
  {
    key: "score_model",
    label: "点数推測",
    content: <div>準備中です。</div>,
  },
  {
    key: "tune_model",
    label: "楽曲提案",
    content: <div>準備中です。</div>,
  },
];

// U005001_楽曲レコメンド画面
export default function Page() {
  return (
    <main>
      <div className="page-item-all">
        <Tab tab={tabData} />
      </div>
    </main>
  );
}
