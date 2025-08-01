"use client";
import Link from "next/link";
import Image from "next/image";
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
import scoreModel from "@/app/model/domain/scoreModel";
import { b000003Model } from "@/app/model/bff/common/B000003Model";
import { schema_score } from "@/validators/score/U004001Schema";

export default function Component({ data, searchCount }) {
  // バリデーション用
  const form = useForm({
    resolver: yupResolver(schema_score),
  });

  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const [modelTypeCode, setModelTypeCode] = useState([]);
  const score = scoreModel((state) => state.score);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentItem = score?.slice(startIndex, endIndex);
  const totalPages =
    score && score.length > 0 ? Math.ceil(score.length / perPage) : 1;

  const column = [
    { key: "artist_name", label: "歌手名", option: TABLE_OPTION.HIDDEN },
    { key: "tune_name", label: "楽曲名", option: TABLE_OPTION.HIDDEN },
    {
      key: "model_type",
      label: "採点機種",
      option: TABLE_OPTION.SELECT,
      select: modelTypeCode,
    },
    {
      key: "score",
      label: "点数",
      option: TABLE_OPTION.INPUT,
      input: TABLE_OPTION.NUMBER,
      step: "0.001",
    },
    {
      key: "scoring_date",
      label: "採点日",
      option: TABLE_OPTION.INPUT,
      input: TABLE_OPTION.DATE,
    },
    {
      key: "button",
      label: "登録",
      option: TABLE_OPTION.BUTTON,
      button: (item) => {
        const isLoading = loading === item.tune_id;
        const isDisabled = isLoading || isRegister;
        const label = isLoading
          ? "登録中..."
          : isRegister
          ? "登録済み"
          : "登録";
        return (
          <button
            type={UI_TYPE.SUBMIT}
            className={`btn ${isDisabled && "cursor-not-allowed"} ${
              isRegister && "!bg-gray-600"
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

    const getCode = async () => {
      // B000003_コード値取得BFF実行
      const result = await b000003Model({ code_id: "0001" });
      // 異常終了メッセージ
      if (!result.success_flg) {
        toast.error(UI_MSG.masterError);
        setLoading(false);
        return;
      }

      // 採点機種のコード値を設定
      setModelTypeCode(result.response_info);
      return;
    };

    // コード値を取得
    getCode();
  }, [searchCount]);

  // 登録ボタン押下
  const onSubmit = async (data) => {
    // ローディング開始
    setLoading(true);

    console.log("通りました。");
    console.log(data);

    // ローディング終了
    setLoading(false);
  };

  return (
    <div>
      <p className="annotation-msg">
        ※ 一時保存したデータは、1ヶ月以内に削除されます。
      </p>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("バリデーションエラー:", errors);
          })}
        >
          <Table column={column} data={currentItem} rowKey="tune_id" />
        </form>
      </FormProvider>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
