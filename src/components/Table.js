"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { TABLE_OPTION } from "@/lib/uiConstants";
import { UI_TYPE } from "@/lib/uiConstants";
import { getValueByPath } from "@/utils/uiUtils";

export default function Component({ column, data, rowKey }) {
  const [tableData, setTableData] = useState([]);

  const form = useFormContext();
  const {
    register,
    formState: { errors },
  } = form;

  // データ更新
  useEffect(() => {
    setTableData([...data]);
  }, [data]);

  return (
    <div className="page-item-table">
      <table>
        <thead>
          <tr>
            {column.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData && tableData.length > 0 ? (
            tableData.map((item, index) => (
              <tr
                key={getValueByPath(item, rowKey)}
                className="page-item-table-tbody-tr"
              >
                {column.map((col) => {
                  // 値を取得
                  const value = getValueByPath(item, col.key);
                  const name = `table[${index}].${col.key}`;

                  // 数値
                  if (col.option === TABLE_OPTION.NUMBER) {
                    return (
                      <td key={col.key}>
                        {value ? Number(value).toLocaleString() : "-"}
                      </td>
                    );
                  }

                  // カンマ区切り
                  if (col.option === TABLE_OPTION.COMMA) {
                    return (
                      <td key={col.key}>
                        {value && value.length > 0 ? value.join(", ") : "-"}
                      </td>
                    );
                  }

                  // 入力項目
                  if (col.option === TABLE_OPTION.INPUT) {
                    if (col.input === TABLE_OPTION.NUMBER) {
                      return (
                        <td key={col.key}>
                          <input
                            id={col.key}
                            type={UI_TYPE.NUMBER}
                            step={col.step}
                            defaultValue={value}
                            {...register(name)}
                          />
                          {errors?.table?.[index]?.[col.key]?.message && (
                            <p className="error-msg">
                              {errors?.table?.[index]?.[col.key]?.message}
                            </p>
                          )}
                        </td>
                      );
                    }

                    // 日付項目
                    if (col.input === TABLE_OPTION.DATE) {
                      return (
                        <td key={col.key}>
                          <input
                            id={col.key}
                            type={UI_TYPE.DATE}
                            defaultValue={
                              value
                                ? value.slice(0, 10)
                                : new Date().toISOString().slice(0, 10)
                            }
                            {...register(name)}
                          />
                          {errors?.table?.[index]?.[col.key]?.message && (
                            <p className="error-msg">
                              {errors?.table?.[index]?.[col.key]?.message}
                            </p>
                          )}
                        </td>
                      );
                    }
                  }

                  // セレクトボックス
                  if (col.option === TABLE_OPTION.SELECT) {
                    return (
                      <td key={col.key}>
                        <select {...register(name)}>
                          <option value="">選択してください</option>
                          {col.select?.map((item) => (
                            <option
                              key={item.code_value}
                              value={item.code_value}
                            >
                              {item.code_name}
                            </option>
                          ))}
                        </select>
                        {errors?.table?.[index]?.[col.key]?.message && (
                          <p className="error-msg">
                            {errors?.table?.[index]?.[col.key]?.message}
                          </p>
                        )}
                      </td>
                    );
                  }

                  // ボタン
                  if (col.option === TABLE_OPTION.BUTTON) {
                    return <td key={col.key}>{col.button(item, index)}</td>;
                  }

                  // 画像ファイル
                  if (col.option === TABLE_OPTION.IMAGE) {
                    return (
                      <td key={col.key}>
                        {value ? (
                          <Image
                            src={value}
                            alt="イメージ画像"
                            width={64}
                            height={64}
                          />
                        ) : (
                          <span className="no-image">No Image</span>
                        )}
                      </td>
                    );
                  }

                  // リンク
                  if (col.option === TABLE_OPTION.LINK) {
                    return (
                      <td key={col.key}>
                        <Link
                          href={getValueByPath(item, col.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {value}
                        </Link>
                      </td>
                    );
                  }

                  // 非活性項目
                  if (col.option === TABLE_OPTION.HIDDEN) {
                    return (
                      <td key={col.key}>
                        <span>{value}</span>
                        <input
                          type="hidden"
                          value={value}
                          {...register(name)}
                        />
                      </td>
                    );
                  }

                  return <td key={col.key}>{value || "-"}</td>;
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="no-data">
                該当するデータがありません
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
