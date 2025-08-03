"use client";
import { useState } from "react";
import SearchTune from "@/components/score/search/SearchTune";
import ArtistList from "@/components/score/search/ArtistList";
import TuneList from "@/components/score/search/TuneList";
import artistModel from "@/domain/score/store/search/artistModel";
import tuneModel from "@/domain/score/store/search/tuneModel";

export default function Component() {
  const [searchCount, setSearchCount] = useState(0);
  const [allTuneCount, setAllTuneCount] = useState(0);
  const artistInfo = artistModel((state) => state.model);
  const tuneInfo = tuneModel((state) => state.model);

  // 検索結果更新
  const onSearch = (result) => {
    // 検索回数カウント
    setSearchCount((prev) => prev + 1);

    // 歌手一覧・楽曲一覧に値を設定
    artistModel.getState().setModel(result?.artist_info);
    tuneModel.getState().setModel(result?.tune_info);
  };

  // 全楽曲取得結果更新
  const onAllTune = (result) => {
    // 全楽曲取得回数カウント
    setAllTuneCount((prev) => prev + 1);

    // 楽曲一覧に値を設定
    tuneModel.getState().setModel(result);
  };

  return (
    <div>
      <h1>楽曲検索</h1>
      <p className="annotation-msg">
        ※ Spotifyのレート制限により、通信が不安定な場合がございます。
      </p>
      <SearchTune onSearch={onSearch} />
      <h2>歌手一覧</h2>
      <ArtistList
        data={artistInfo}
        onAllTune={onAllTune}
        searchCount={searchCount}
      />
      <h2>楽曲一覧</h2>
      <TuneList data={tuneInfo} searchCount={searchCount + allTuneCount} />
    </div>
  );
}
