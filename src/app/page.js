// app/page.js
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function MainPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // トークンがなければログイン画面へリダイレクト
  if (!token) {
    redirect("/auth/login");
  }

  return (
    <main>
      <h1>ようこそ、メイン画面へ！</h1>
      {/* 他のコンテンツ */}
    </main>
  );
}
