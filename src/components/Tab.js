"use client";

import { useState } from "react";

export default function Component({ tab }) {
  const [activeTab, setActiveTab] = useState(tab[0].key);

  return (
    <div>
      {/* タブボタン */}
      <div className="flex space-x-4 mb-4">
        {tab.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`${
              activeTab === item.key
                ? "page-item-tub-select"
                : "page-item-tub-not-select"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tab.map((item) =>
          item.key === activeTab ? (
            <div key={item.key} className="animate-fadeIn">
              {item.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
