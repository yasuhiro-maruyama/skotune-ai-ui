"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// ホーム画面
export default function Page() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "ホーム",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 10L12 3L21 10V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V10Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 21V12H15V21"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      content: (
        <p>Coming Soon... 開発中の機能(ホーム画面)のため、お待ちください</p>
      ),
    },
    {
      label: "検索",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8" stroke="black" stroke-width="2" />
          <line
            x1="16.65"
            y1="16.65"
            x2="21"
            y2="21"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      ),
      content: (
        <p>Coming Soon... 開発中の機能(検索画面)のため、お待ちください</p>
      ),
    },
    {
      label: "採点履歴登録",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M8 12L11 15L16 9"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      content: (
        <p>
          Coming Soon... 開発中の機能(採点履歴登録画面)のため、お待ちください
        </p>
      ),
    },
    {
      label: "楽曲レコメンド",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 3V14.5C16 15.88 14.88 17 13.5 17C12.12 17 11 15.88 11 14.5C11 13.12 12.12 12 13.5 12C13.83 12 14.14 12.06 14.43 12.17L14.5 12.2V6.7L10 7.5V18.5C10 19.88 8.88 21 7.5 21C6.12 21 5 19.88 5 18.5C5 17.12 6.12 16 7.5 16C7.83 16 8.14 16.06 8.43 16.17L8.5 16.2V5L16 3Z"
            fill="black"
          />
        </svg>
      ),
      content: (
        <p>
          Coming Soon... 開発中の機能(楽曲レコメンド画面)のため、お待ちください
        </p>
      ),
    },
    {
      label: "ユーザー設定",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8" r="4" stroke="black" stroke-width="2" />
          <path
            d="M4 20C4 16 8 14 12 14C16 14 20 16 20 20"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      ),
      content: (
        <p>
          Coming Soon... 開発中の機能(ユーザー設定画面)のため、お待ちください
        </p>
      ),
    },
    {
      label: "モデル設定",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="6"
            width="16"
            height="16"
            rx="3"
            ry="3"
            stroke="black"
            stroke-width="1.5"
            fill="none"
          />

          <circle
            cx="8"
            cy="10"
            r="2"
            stroke="black"
            stroke-width="1.5"
            fill="none"
          />
          <circle
            cx="16"
            cy="10"
            r="2"
            stroke="black"
            stroke-width="1.5"
            fill="none"
          />

          <rect
            x="7"
            y="17"
            width="10"
            height="2"
            stroke="black"
            stroke-width="1.5"
            fill="none"
            rx="0.8"
            ry="0.8"
          />

          <line
            x1="12"
            y1="2"
            x2="12"
            y2="6"
            stroke="black"
            stroke-width="1.5"
          />
          <circle
            cx="12"
            cy="2"
            r="1"
            stroke="black"
            stroke-width="1.5"
            fill="none"
          />
        </svg>
      ),
      content: (
        <p>Coming Soon... 開発中の機能(モデル設定画面)のため、お待ちください</p>
      ),
    },
    {
      label: "管理者",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L5 5v9c0 5 5 8 7 8s7-3 7-8V5l-7-3z"
            stroke="black"
            stroke-width="2"
            fill="none"
          />

          <path
            d="M12 8l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z"
            stroke="black"
            stroke-width="1.5"
            fill="none"
          />
        </svg>
      ),
      content: (
        <p>Coming Soon... 開発中の機能(管理者画面)のため、お待ちください</p>
      ),
    },
    {
      label: "マイリスト作成",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            stroke="black"
            stroke-width="2"
            fill="none"
            stroke-linejoin="round"
          />
        </svg>
      ),
      content: (
        <p>
          Coming Soon... 開発中の機能(マイリスト作成画面)のため、お待ちください
        </p>
      ),
    },
  ];

  useEffect(() => {
    if (isMobile) router.push("/home/mobile");
  }, [isMobile, router]);

  return (
    <main>
      <div className="w-[1920px] h-[1080px] relative overflow-hidden bg-white">
        <div className="w-64 h-[1080px] absolute left-0 top-0 overflow-hidden bg-white border-t-0 border-r border-b-0 border-l-0 border-[#e0e0e0]">
          <p className="absolute left-6 top-6 text-xl font-semibold text-left text-black">
            SkoTune AI
          </p>
          <div className="flex flex-col justify-start items-start w-60 absolute left-2 top-[78px] gap-1">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === index
                    ? "bg-gray-200 text-black"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                <span className="text-base font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-start items-start absolute left-[300px] top-[80px] gap-8">
          <div className="tab-content mt-4">{tabs[activeTab].content}</div>
        </div>
        <div className="w-[1504px] h-10 absolute left-[336px] top-6">
          <div className="flex justify-center items-center h-10 absolute left-[1371px] top-0 gap-2 px-4 rounded-lg bg-black">
            <button
              type="submit"
              className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-white"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
