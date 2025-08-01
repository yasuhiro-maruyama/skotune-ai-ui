"use client";
import { useState } from "react";
import SearchTune from "@/components/score/search/SearchTune";
import ArtistList from "@/components/score/search/ArtistList";
import TuneList from "@/components/score/search/TuneList";

export default function Component() {
  const [searchCount, setSearchCount] = useState(0);
  const [allTuneCount, setAllTuneCount] = useState(0);
  const [artistList, setArtistList] = useState([]);
  const [tuneList, setTuneList] = useState([]);

  // 検索結果更新
  const onSearch = (result) => {
    // 検索回数カウント
    setSearchCount((prev) => prev + 1);

    // 歌手一覧・楽曲一覧に値を設定
    setArtistList(result?.artist_info);
    setTuneList(result?.tune_info);
  };

  // 全楽曲取得結果更新
  const onAllTune = (result) => {
    // 全楽曲取得回数カウント
    setAllTuneCount((prev) => prev + 1);

    // 楽曲一覧に値を設定
    setTuneList(result);
  };

  return (
    <div>
      <h1>楽曲検索</h1>
      <SearchTune onSearch={onSearch} />
      <h2>歌手一覧</h2>
      <ArtistList
        data={artistList}
        onAllTune={onAllTune}
        searchCount={searchCount}
      />
      <h2>楽曲一覧</h2>
      <TuneList data={tuneList} searchCount={searchCount + allTuneCount} />
    </div>
  );
}
