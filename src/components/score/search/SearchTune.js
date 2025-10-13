"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { RESPONSE_CODE } from "@/lib/apiConstants";
import { UI_TYPE } from "@/lib/uiConstants";
import { UI_MSG } from "@/lib/messages";
import { b003001Model } from "@/domain/search/bff/B003001Model";
import { schema_search } from "@/schema/score/ui/U004001Schema";
import * as CONSTANTS from "@/lib/apiConstants";

export default function Component({ onSearch }) {
  // バリデーション用
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema_search),
  });

  // 検索項目の値取得
  const inputValue = !watch("artist_name") && !watch("tune_name");
  const [loading, setLoading] = useState(false);

  // 検索ボタン押下
  const handleSearch = async (data) => {
    // ローディング開始
    setLoading(true);

    // B003_001_検索機能_楽曲情報BFF実行
    const result = await b003001Model(CONSTANTS.HTTP_METHOD.GET, data);

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

    // 検索情報を親コンポーネントに渡す
    onSearch(result.response_info);

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
            <label htmlFor="artist_name">歌手名</label>
            <input
              id="artist_name"
              type={UI_TYPE.TEXT}
              maxLength={200}
              placeholder="例：YOASOBI"
              {...register("artist_name")}
            />
            {errors.artist_name && (
              <p className="error-msg">{errors.artist_name.message}</p>
            )}
          </div>

          <div className="page-item-element-div">
            <label htmlFor="tune_name">曲名</label>
            <input
              id="tune_name"
              type={UI_TYPE.TEXT}
              maxLength={200}
              placeholder="例：アイドル"
              {...register("tune_name")}
            />
            {errors.tune_name && (
              <p className="error-msg">{errors.tune_name.message}</p>
            )}
          </div>

          <button
            type={UI_TYPE.SUBMIT}
            className={`btn ${(inputValue || loading) && "cursor-not-allowed"}`}
            disabled={inputValue || loading}
          >
            {loading ? "検索中..." : "検索"}
          </button>
        </div>
      </form>
    </div>
  );
}
