"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UI_TYPE } from "@/lib/uiConstants";
import { UI_MSG } from "@/lib/messages";
import userModel from "@/domain/common/store/userModel";
import { b001001Model } from "@/domain/auth/bff/B001001Model";
import { schema } from "@/schema/auth/ui/U001001Schema";

// ログイン画面
export default function Page() {
  // ルーティング用
  const router = useRouter();
  // バリデーション用
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // パスワードの表示切り替えフラグ
  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = watch("password");

  // ログインボタン押下時
  const loginButton = async (data) => {
    // B001_001_認証機能_ログイン照会BFF実行
    const result = await b001001Model(data);

    // 異常終了であれば、メッセージを表示して終了
    if (!result.success_flg) {
      toast.error(UI_MSG.authError);
      return;
    }

    // 正常に返却されれば、ユーザー情報を保存してホーム画面に遷移
    userModel.getState().setModel(result.user_info);
    router.push("/skotune/home");
    return;
  };

  return (
    <main className="center-all">
      <div className="center-item">
        <h1>SkoTune AI ログイン</h1>
        <form onSubmit={handleSubmit(loginButton)}>
          <div>
            <label htmlFor="user_id">メールアドレス</label>
            <input
              id="user_id"
              type={UI_TYPE.E_MAIL}
              maxLength={200}
              placeholder="you@example.com"
              {...register("user_id")}
            />
            {errors.user_id && (
              <p className="error-msg">{errors.user_id.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? UI_TYPE.TEXT : UI_TYPE.PASSWORD}
                minLength={8}
                maxLength={32}
                placeholder="********"
                {...register("password")}
              />
              <button
                type={UI_TYPE.BUTTON}
                className={`password-btn ${
                  !passwordValue && "cursor-not-allowed"
                }`}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                disabled={!passwordValue}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}
          </div>
          <button type={UI_TYPE.SUBMIT} className="center-item-btn">
            ログイン
          </button>
        </form>
        <p className="center-item-sentence">
          アカウントをお持ちでない方は{" "}
          <Link href="/auth/user" target="_blank" rel="noopener noreferrer">
            登録
          </Link>
        </p>
      </div>
    </main>
  );
}
