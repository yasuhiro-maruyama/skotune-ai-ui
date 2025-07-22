"use client";
import { useRouter, usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import menuModel from "@/app/model/domain/menuModel";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const menu = menuModel((state) => state.menu);

  // モバイル版レイアウト
  if (isMobile) {
    return (
      <main className="flex flex-col min-h-screen bg-white">
        {/* コンテンツ部分 */}
        <div className="flex-grow p-4">{children}</div>

        {/* ナビゲーションバー */}
        {menu?.length > 0 && (
          <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t border-gray-200 p-2">
            {menu.map((tab, index) => {
              const targetPath = `/skotune${tab.content}`;
              const isActive = pathname === targetPath;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (!isActive) router.push(targetPath);
                  }}
                  className={`flex flex-col items-center justify-center gap-1 px-2 text-xs ${
                    isActive ? "text-black" : "text-gray-400"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: tab.icon }} />
                </button>
              );
            })}
          </nav>
        )}
      </main>
    );
  }

  // PC版レイアウト
  return (
    <html lang="ja">
      <body>
        <div className="w-full h-screen relative overflow-hidden bg-white">
          {/* サイドメニュー */}
          <div className="w-64 h-full absolute left-0 top-0 overflow-hidden bg-white border-r border-[#e0e0e0]">
            <p className="absolute left-6 top-6 text-xl font-semibold text-left text-black">
              SkoTune AI
            </p>
            {menu?.length > 0 && (
              <div className="flex flex-col justify-start items-start w-60 absolute left-2 top-[78px] gap-1">
                {menu.map((tab, index) => {
                  const targetPath = `/skotune${tab.content}`;
                  const isActive = pathname === targetPath;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isActive) router.push(targetPath);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        isActive
                          ? "bg-gray-200 text-black"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: tab.icon }} />
                      <span className="text-base font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* コンテンツ部分 */}
          <div className="absolute left-[300px] top-[80px] right-4">
            <div className="tab-content mt-4">{children}</div>
          </div>

          {/* 上部バー */}
          <div className="w-[1504px] h-10 absolute left-[336px] top-6">
            <div className="flex justify-center items-center h-10 absolute left-[1371px] top-0 gap-2 px-4 rounded-lg bg-black">
              <button
                type="submit"
                className="text-base font-medium text-left text-white"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
