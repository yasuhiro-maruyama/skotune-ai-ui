"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from "react-hook-form";
import { UI_MSG } from "@/lib/messages";
import { UI_TYPE } from "@/lib/uiConstants";
import { TABLE_OPTION } from "@/lib/uiConstants";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import userModel from "@/domain/common/store/userModel";
import scoreModel from "@/domain/score/store/scoreModel";
import { b004002Model } from "@/domain/score/bff/B004002Model";

export default function Component({ data, searchCount }) {
  // バリデーション用(なし)
  const form = useForm({
    resolver: yupResolver(null),
  });

  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(null);
  const user = userModel((state) => state.user);
  const score = scoreModel((state) => state.score);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentItem = data?.slice(startIndex, endIndex);
  const totalPages =
    data && data.length > 0 ? Math.ceil(data.length / perPage) : 1;

  const column = [
    { key: "image.2.url", label: "イメージ", option: TABLE_OPTION.IMAGE },
    { key: "artist_name", label: "歌手名", option: null },
    {
      key: "tune_name",
      label: "楽曲名",
      option: TABLE_OPTION.LINK,
      link: "external_url",
    },
    { key: "popularity", label: "人気度", option: TABLE_OPTION.NUMBER },
    { key: "release_date", label: "リリース日", option: null },

    {
      key: "button",
      label: "採点登録予定",
      option: TABLE_OPTION.BUTTON,
      button: (item) => {
        const isLoading = loading === item.tune_id;
        const isReserved = score.some((s) => s.tune_id === item.tune_id);
        const isDisabled = isLoading || isReserved;
        const label = isLoading
          ? "予約中..."
          : isReserved
          ? "予約済み"
          : "予約";
        return (
          <button
            type={UI_TYPE.BUTTON}
            onClick={() => reservation(item)}
            className={`btn ${isDisabled && "cursor-not-allowed"} ${
              isReserved && "!bg-gray-600"
            }`}
            disabled={isDisabled}
          >
            {label}
          </button>
        );
      },
    },
  ];

  // 初期表示
  useEffect(() => {
    setCurrentPage(1);
  }, [searchCount]);

  // 予約ボタン押下
  const reservation = async (data) => {
    // ローディング開始
    setLoading(data.tune_id);

    // B004002_楽曲予約登録BFF
    const result = await b004002Model({ ...data, user_id: user.user_id });
    console.log(user.user_id);

    // 異常終了メッセージ
    if (!result.success_flg) {
      toast.error(UI_MSG.searchError);
      setLoading(null);
      return;
    }

    // 予約情報にデータを追加
    scoreModel.getState().setScore([
      ...score,
      {
        artist_id: data.artist_id,
        artist_name: data.artist_name,
        tune_id: data.tune_id,
        tune_name: data.tune_name,
        model_type: null,
        score: 0,
        scoring_date: null,
      },
    ]);

    // 予約メッセージ
    toast.info(UI_MSG.searchReservation);

    // ローディング終了
    setLoading(null);
  };

  return (
    <div>
      <p className="annotation-msg">
        ※ 予約した楽曲は採点登録タブで点数を登録できます。
      </p>
      <FormProvider {...form}>
        <Table column={column} data={currentItem} rowKey="tune_id" />
      </FormProvider>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
