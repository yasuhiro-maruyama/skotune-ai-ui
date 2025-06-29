"use client";
import { useState } from "react";
import menuModel from "@/app/model/domain/menuModel";

// ホーム画面
export default function Page() {
  const [activeTab, setActiveTab] = useState(0);
  const menu = menuModel((state) => state.menu);

  return (
    <main>
      <div className="w-[1920px] h-[1080px] relative overflow-hidden bg-white">
        <div className="w-64 h-[1080px] absolute left-0 top-0 overflow-hidden bg-white border-t-0 border-r border-b-0 border-l-0 border-[#e0e0e0]">
          <p className="absolute left-6 top-6 text-xl font-semibold text-left text-black">
            SkoTune AI
          </p>
          {menu?.length > 0 && (
            <div className="flex flex-col justify-start items-start w-60 absolute left-2 top-[78px] gap-1">
              {menu.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    activeTab === index
                      ? "bg-gray-200 text-black"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: tab.icon }} />
                  <span className="text-base font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {menu?.length > 0 && (
          <div className="flex justify-start items-start absolute left-[300px] top-[80px] gap-8">
            <div className="tab-content mt-4">
              <div
                dangerouslySetInnerHTML={{ __html: menu[activeTab].content }}
              />
            </div>
          </div>
        )}
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
