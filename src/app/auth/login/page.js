"use client";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { toast } from "sonner";
import { ACTION_TYPE } from "@/lib/uiConstants";
import { bp001Model } from "@/app/model/bff/post/BP001Model";

// ステート管理
const reducer = (state, action) => {
  switch (action.type) {
    // 項目入力時のイベント
    case ACTION_TYPE.INPUT:
      return { ...state, [action.field]: action.payload };
    // 初期化イベント
    case ACTION_TYPE.CLEAR:
      return {};
    default:
      return state;
  }
};

// ログイン画面
export default function Page() {
  const router = useRouter();
  // 入力項目を保持する
  const [state, dispatch] = useReducer(reducer, {});

  // ログインボタン押下時
  const loginButton = async (e) => {
    // デフォルトの送信動作(ページリロードなど)を防ぐ
    e.preventDefault();
    // ログイン照会BFF呼び出し
    const result = await bp001Model(state);

    result ? router.push("/") : toast.error("ログインに失敗しました。");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          ログイン
        </h1>
        <form className="space-y-5" onSubmit={loginButton}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              onChange={(e) => {
                dispatch({
                  type: ACTION_TYPE.INPUT,
                  field: "user_id",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
              onChange={(e) => {
                dispatch({
                  type: ACTION_TYPE.INPUT,
                  field: "password",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-200"
          >
            ログイン
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          アカウントをお持ちでない方は{" "}
          <a href="#" className="text-blue-500 hover:underline">
            登録
          </a>
        </p>
      </div>
    </main>
  );
}
