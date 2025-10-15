"use client";
import { useState } from "react";
import SearchTune from "@/components/score/history/SearchTune";
import TuneList from "@/components/score/history/TuneList";
import tuneModel from "@/domain/score/store/history/tuneModel";

export default function Component() {
  const [searchCount, setSearchCount] = useState(0);
  const tuneInfo = tuneModel((state) => state.model);

  // 検索結果更新
  const onSearch = (result) => {
    // 検索回数カウント
    setSearchCount((prev) => prev + 1);

    // 楽曲一覧に値を設定
    tuneModel.getState().setModel(result);
  };

  return (
    <div>
      <h1>履歴検索</h1>
      <SearchTune onSearch={onSearch} />
      <h2>履歴一覧</h2>
      <TuneList data={tuneInfo} searchCount={searchCount} />
    </div>
  );
}
