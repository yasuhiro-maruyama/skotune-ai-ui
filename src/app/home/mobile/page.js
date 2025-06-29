"use client";
import { useState } from "react";
import menuModel from "@/app/model/domain/menuModel";

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);
  const menu = menuModel((state) => state.menu);

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {menu?.length > 0 && (
        <div className="flex-grow p-4">
          <div dangerouslySetInnerHTML={{ __html: menu[activeTab].content }} />
        </div>
      )}

      {menu?.length > 0 && (
        <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t border-gray-200 p-2">
          {menu.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex flex-col items-center justify-center gap-1 px-2 text-xs ${
                activeTab === index ? "text-black" : "text-gray-400"
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: tab.icon }} />
            </button>
          ))}
        </nav>
      )}
    </main>
  );
}
