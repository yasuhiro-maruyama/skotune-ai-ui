"use client";
import Tab from "@/components/Tab";

const tabData = [
  {
    key: "joyspund",
    label: "分析採点マスター",
    content: <div>準備中です。</div>,
  },
  {
    key: "joyspund_ai",
    label: "分析採点AI",
    content: <div>準備中です。</div>,
  },
  {
    key: "dam",
    label: "精密採点DX",
    content: <div>準備中です。</div>,
  },
  {
    key: "dam_ai",
    label: "精密採点Ai",
    content: <div>準備中です。</div>,
  },
];

// U002001_ホーム画面
export default function Page() {
  return (
    <main>
      <div className="page-item-all">
        <Tab tab={tabData} />
      </div>
    </main>
  );
}
