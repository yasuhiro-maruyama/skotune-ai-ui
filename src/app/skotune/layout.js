"use client";
import { useRouter, usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import userModel from "@/domain/common/store/userModel";
import menuModel from "@/domain/common/store/menuModel";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const user = userModel((state) => state.user);
  const menu = menuModel((state) => state.menu);

  const isActivePath = (targetPath) => pathname === targetPath;

  // モバイル版メニューレイアウト
  if (isMobile) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <div className="flex-grow p-4">{children}</div>

        {menu?.length > 0 && (
          <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t border-gray-300 p-2">
            {menu.map((tab, index) => {
              const targetPath = `/skotune${tab.content}`;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (!isActivePath(targetPath)) router.push(targetPath);
                  }}
                  className={`flex flex-col items-center justify-center gap-1 px-2 text-xs ${
                    isActivePath(targetPath)
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500 hover:text-blue-600"
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

  // PC版メニューレイアウト
  return (
    <div className="flex min-h-screen">
      {/* メニュー表示 */}
      <aside className="menu-item-aside">
        <h1 className="menu-item-h1">SkoTune AI</h1>
        <nav className="menu-item-tab">
          {menu?.length > 0 &&
            menu.map((tab, index) => {
              const targetPath = `/skotune${tab.content}`;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (!isActivePath(targetPath)) router.push(targetPath);
                  }}
                  className={`${
                    isActivePath(targetPath)
                      ? "menu-item-btn-select"
                      : "menu-item-btn-not-select"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: tab.icon }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <section className="flex-1">
        {/* ヘッダー */}
        <header>
          <span className="mr-4">{user?.user_name}</span>
          <button className="btn">ログアウト</button>
        </header>

        {/* ページコンテンツ */}
        <main className="page-item">{children}</main>
      </section>
    </div>
  );
}
