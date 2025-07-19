"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UI_TYPE } from "@/lib/uiConstants";
import { UI_MSG } from "@/lib/messages";
import userModel from "@/app/model/domain/userModel";
import { b001001Model } from "@/app/model/bff/auth/B001001Model";
import { schema } from "@/validators/auth/U001001Schema";

// ログイン画面
export default function Page() {
  // ルーティング用
  const router = useRouter();
  // バリデーション用
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ログインボタン押下時
  const loginButton = async (data) => {
    // B001001_ログイン照会BFF実行
    const result = await b001001Model(data);

    // 異常終了であれば、メッセージを表示して終了
    if (!result.success_flg) {
      toast.error(UI_MSG.authError);
      return;
    }

    // 正常に返却されれば、ユーザー情報を保存してホーム画面に遷移
    userModel.getState().setUser(result.user_info);
    router.push("/");
    return;
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          SkoTune AI ログイン
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit(loginButton)}>
          <div>
            <label
              htmlFor="user_id"
              className="block text-sm font-medium text-gray-600"
            >
              メールアドレス
            </label>
            <input
              id="user_id"
              type={UI_TYPE.E_MAIL}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
              placeholder="you@example.com"
              {...register("user_id")}
            />
            {errors.user_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user_id.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              パスワード
            </label>
            <input
              id="password"
              type={UI_TYPE.PASSWORD}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
              placeholder="********"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
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
          <Link
            href="/auth/user"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            登録
          </Link>
        </p>
      </div>
    </main>
  );
}
