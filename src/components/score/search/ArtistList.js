"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from "react-hook-form";
import { RESPONSE_CODE } from "@/lib/apiConstants";
import { UI_MSG } from "@/lib/messages";
import { UI_TYPE } from "@/lib/uiConstants";
import { TABLE_OPTION } from "@/lib/uiConstants";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { b003002Model } from "@/app/model/bff/search/B003002Model";

export default function Component({ data, onAllTune, searchCount }) {
  // バリデーション用(なし)
  const form = useForm({
    resolver: yupResolver(null),
  });

  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(null);

  // ページネーション生成
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentItem = data?.slice(startIndex, endIndex);
  const totalPages =
    data && data.length > 0 ? Math.ceil(data.length / perPage) : 1;

  // テーブル生成
  const column = [
    { key: "image.2.url", label: "イメージ", option: TABLE_OPTION.IMAGE },
    {
      key: "artist_name",
      label: "歌手名",
      option: TABLE_OPTION.LINK,
      link: "external_url",
    },
    { key: "genre", label: "ジャンル", option: TABLE_OPTION.COMMA },
    { key: "follower", label: "フォロワー数", option: TABLE_OPTION.NUMBER },
    { key: "popularity", label: "人気度", option: TABLE_OPTION.NUMBER },
    {
      key: "button",
      label: "全楽曲取得",
      option: TABLE_OPTION.BUTTON,
      button: (item) => {
        const isLoading = loading === item.artist_id;
        return (
          <button
            type={UI_TYPE.BUTTON}
            onClick={() => allTune(item)}
            className={`btn ${isLoading && "cursor-not-allowed"}`}
            disabled={isLoading}
          >
            {isLoading ? "取得中..." : "全楽曲取得"}
          </button>
        );
      },
    },
  ];

  // ページ数を初期値に戻す。
  useEffect(() => {
    setCurrentPage(1);
  }, [searchCount]);

  // 全楽曲取得ボタン押下
  const allTune = async (data) => {
    // ローディング開始
    setLoading(data.artist_id);

    // B003002_全楽曲取得BFF実行
    const result = await b003002Model(data);

    // 異常終了メッセージ
    if (!result.success_flg) {
      toast.error(UI_MSG.searchError);
      setLoading(null);
      return;
    }

    // 検索結果0件メッセージ
    if (result.code === RESPONSE_CODE.NOT_FOUND) {
      toast.info(UI_MSG.searchNoData);
      setLoading(null);
      return;
    }

    // 検索情報を親コンポーネントに渡す
    onAllTune(result.response_info);

    // 正常終了メッセージ
    toast.success(UI_MSG.searchSuccess);

    // ローディング終了
    setLoading(null);
  };
  return (
    <div>
      <p className="annotation-msg">
        ※ 全楽曲取得には時間がかかる場合がございます。
      </p>
      <FormProvider {...form}>
        <Table column={column} data={currentItem} rowKey="artist_id" />
      </FormProvider>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
