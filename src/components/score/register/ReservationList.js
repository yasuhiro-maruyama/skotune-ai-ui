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
import reservationModel from "@/domain/score/store/score/reservationModel";
import userModel from "@/domain/common/store/userModel";
import { b000002Model } from "@/domain/common/bff/B000002Model";
import { b004001Model } from "@/domain/score/bff/B004001Model";
import { b004002Model } from "@/domain/score/bff/B004002Model";
import { schema_score } from "@/schema/score/ui/U004001Schema";
import * as CONSTANTS from "@/lib/apiConstants";

export default function Component() {
  // バリデーション用
  const form = useForm({
    resolver: yupResolver(schema_score),
  });

  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [registerLoading, setRegisterLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [modelTypeCode, setModelTypeCode] = useState([]);
  const [registerInfo, setRegisterInfo] = useState([]);
  const reservationInfo = reservationModel((state) => state.model);
  const userInfo = userModel((state) => state.model);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentItem = reservationInfo?.slice(startIndex, endIndex);
  const totalPages =
    reservationInfo && reservationInfo.length > 0
      ? Math.ceil(reservationInfo.length / perPage)
      : 1;

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
      button: (item, index) => {
        const isRegisterLoading = registerLoading === item.tune_id;
        const isRegister = registerInfo.some((s) => s.tune_id === item.tune_id);
        const isDisabled = isRegisterLoading || isRegister;
        const label = isRegisterLoading
          ? "登録中..."
          : isRegister
          ? "登録済み"
          : "登録";
        return (
          <button
            type={UI_TYPE.BUTTON}
            className={`btn ${isDisabled && "cursor-not-allowed"} ${
              isRegister && "!bg-gray-600"
            }`}
            disabled={isDisabled}
            onClick={() => {
              const fieldKeys = ["model_type", "score", "scoring_date"];
              const targets = fieldKeys.map((key) => `table.${index}.${key}`);
              form.trigger(targets).then((valid) => {
                if (valid) {
                  const values = form.getValues();
                  registerTune({
                    ...values.table?.[index],
                    user_id: userInfo.user_id,
                    artist_id: item.artist_id,
                    tune_id: item.tune_id,
                  });
                }
              });
            }}
          >
            {label}
          </button>
        );
      },
    },
    {
      key: "button",
      label: "削除",
      option: TABLE_OPTION.BUTTON,
      button: (item, index) => {
        const isDeleteLoading = deleteLoading === item.tune_id;
        const isDelete = registerInfo.some((s) => s.tune_id === item.tune_id);
        const isDisabled = isDeleteLoading || isDelete;
        const label = isDeleteLoading
          ? "削除中..."
          : isDelete
          ? "削除済み"
          : "削除";
        return (
          <button
            type={UI_TYPE.BUTTON}
            className={`btn ${isDisabled && "cursor-not-allowed"} ${
              isDelete && "!bg-gray-600"
            }`}
            disabled={isDisabled}
            onClick={() => {
              const fieldKeys = ["model_type", "score", "scoring_date"];
              const targets = fieldKeys.map((key) => `table.${index}.${key}`);
              deleteTune({
                user_id: userInfo.user_id,
                artist_id: item.artist_id,
                tune_id: item.tune_id,
              });
              // form.trigger(targets).then((valid) => {
              //   if (valid) {
              //     const values = form.getValues();
              //     deleteTune({
              //       ...values.table?.[index],
              //       user_id: userInfo.user_id,
              //       artist_id: item.artist_id,
              //       tune_id: item.tune_id,
              //     });
              //   }
              // });
            }}
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
      // B000_002_共通機能_コード値情報BFF実行
      const result = await b000002Model(CONSTANTS.HTTP_METHOD.GET, {
        code_id: CONSTANTS.CODE.MODEL_TYPE,
      });
      console.log(result);
      // 異常終了メッセージ
      if (!result.success_flg) {
        toast.error(UI_MSG.masterError);
        return;
      }

      // 採点機種のコード値を設定
      setModelTypeCode(result.response_info);
      return;
    };

    // コード値を取得
    getCode();
  }, []);

  // 登録ボタン押下
  const registerTune = async (data) => {
    // ローディング開始
    setRegisterLoading(data.tune_id);

    // B004_002_採点機能_採点履歴情報BFF実行(登録)
    const b004002Result = await b004002Model(CONSTANTS.HTTP_METHOD.POST, data);
    // 異常終了メッセージ
    if (!b004002Result.success_flg) {
      toast.error(UI_MSG.scoreRegisterError);
      setRegisterLoading(null);
      return;
    }

    // B004_001_採点機能_楽曲予約情報BFF実行(削除)
    const b004001Result = await b004001Model(
      CONSTANTS.HTTP_METHOD.DELETE,
      data
    );
    // 異常終了メッセージ
    if (!b004001Result.success_flg) {
      toast.error(UI_MSG.scoreRegisterError);
      setRegisterLoading(null);
      return;
    }

    // 正常終了メッセージ
    toast.success(UI_MSG.scoreRegisterSuccess);

    // 登録済みのデータを配列に追加
    setRegisterInfo((prev) => [...prev, data]);

    // ローディング終了
    setRegisterLoading(null);
  };

  // 削除ボタン押下
  const deleteTune = async (data) => {
    // ローディング開始
    setDeleteLoading(data.tune_id);

    // B004_001_採点機能_楽曲予約情報BFF実行(削除)
    const b004001Result = await b004001Model(
      CONSTANTS.HTTP_METHOD.DELETE,
      data
    );
    // 異常終了メッセージ
    if (!b004001Result.success_flg) {
      toast.error(UI_MSG.scoreRegisterError);
      setDeleteLoading(null);
      return;
    }

    // 正常終了メッセージ
    toast.success(UI_MSG.scoreReservationDeleteSuccess);

    // 登録済みのデータを配列に追加
    setRegisterInfo((prev) => [...prev, data]);

    // ローディング終了
    setDeleteLoading(null);
  };

  return (
    <div>
      <p className="annotation-msg">
        ※ 予約した楽曲データは、1ヶ月以内に削除されます。
      </p>
      <FormProvider {...form}>
        <form>
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
