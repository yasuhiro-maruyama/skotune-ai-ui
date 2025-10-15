"use client";
import Tab from "@/components/Tab";
import Search from "@/components/score/Search";
import History from "@/components/score/History";
import Register from "@/components/score/Register";

const tabData = [
  {
    key: "search",
    label: "楽曲検索",
    content: <Search />,
  },
  {
    key: "history",
    label: "履歴検索",
    content: <History />,
  },
  {
    key: "mylist",
    label: "マイリスト",
    content: <div>準備中です。</div>,
  },
  {
    key: "score",
    label: "採点登録",
    content: <Register />,
  },
];

// U004001_採点履歴登録画面
export default function Page() {
  return (
    <main>
      <div className="page-item-all">
        <Tab tab={tabData} />
      </div>
    </main>
  );
}
