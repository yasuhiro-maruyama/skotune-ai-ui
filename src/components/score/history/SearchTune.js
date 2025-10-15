"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import userModel from "@/domain/common/store/userModel";
import { RESPONSE_CODE } from "@/lib/apiConstants";
import { UI_TYPE } from "@/lib/uiConstants";
import { UI_MSG } from "@/lib/messages";
import { b004002Model } from "@/domain/score/bff/B004002Model";
import * as CONSTANTS from "@/lib/apiConstants";

export default function Component({ onSearch }) {
  // バリデーション用
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema_search),
  });

  const user = userModel((state) => state.model);

  // 検索項目の値取得
  const [loading, setLoading] = useState(false);

  // 検索ボタン押下
  const handleSearch = async (data) => {
    // ローディング開始
    setLoading(true);

    // リクエストにユーザーIDを追加
    data.user_id = user.user_id;

    // B004_002_採点機能_採点履歴情報BFF実行(取得)
    const result = await b004002Model(CONSTANTS.HTTP_METHOD.GET, data);

    // 異常終了メッセージ
    if (!result.success_flg) {
      toast.error(UI_MSG.searchError);
      setLoading(false);
      return;
    }

    // 検索結果0件メッセージ
    if (result.code === RESPONSE_CODE.NOT_FOUND) {
      toast.info(UI_MSG.searchNoData);
      setLoading(false);
      return;
    }

    // 各キーを展開して配列をまとめる
    const mergedArray = Object.entries(result.response_info).flatMap(
      ([key, value]) =>
        value.map((item) => ({
          ...item,
          model_type: "01", // 元の配列名を追加
        }))
    );

    // 検索情報を親コンポーネントに渡す
    onSearch(mergedArray);

    // 正常終了メッセージ
    toast.success(UI_MSG.searchSuccess);

    // ローディング終了
    setLoading(false);
  };

  return (
    <div>
      <form className="page-item-form" onSubmit={handleSubmit(handleSearch)}>
        <div className="page-item-element">
          <div className="page-item-element-div">
            <label htmlFor="from_date">開始日</label>
            <input
              id="from_date"
              type={UI_TYPE.DATE}
              // {...register("from_date")}
            />
            {/* {errors.from_date && (
              <p className="error-msg">{errors.from_date.message}</p>
            )} */}
          </div>

          <div className="page-item-element-div">
            <label htmlFor="to_date">終了日</label>
            <input id="to_date" type={UI_TYPE.DATE} />
            {/* {errors.to_date && (
              <p className="error-msg">{errors.to_date.message}</p>
            )} */}
          </div>

          <button
            type={UI_TYPE.SUBMIT}
            className={`btn ${loading && "cursor-not-allowed"}`}
            disabled={loading}
          >
            {loading ? "検索中..." : "検索"}
          </button>
        </div>
      </form>
    </div>
  );
}
