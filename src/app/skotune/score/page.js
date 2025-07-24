"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Pagination from "@/components/Pagination";
import { toast } from "sonner";
import { RESPONSE_CODE } from "@/lib/apiConstants";
import { UI_TYPE } from "@/lib/uiConstants";
import { UI_MSG } from "@/lib/messages";
import { b003001Model } from "@/app/model/bff/search/B003001Model";
import { b003002Model } from "@/app/model/bff/search/B003002Model";
import { schema } from "@/validators/score/U004001Schema";

// U004001_採点履歴登録画面
export default function Page() {
  const [artistList, setArtistList] = useState([]);
  const [tuneList, setTuneList] = useState([]);
  const [artistCurrentPage, setArtistCurrentPage] = useState(1);
  const [tuneCurrentPage, setTuneCurrentPage] = useState(1);
  const artistPerPage = 5;
  const tunePerPage = 10;

  const artistStartIndex = (artistCurrentPage - 1) * artistPerPage;
  const artistEndIndex = artistStartIndex + artistPerPage;
  const artistCurrentItem = artistList?.slice(artistStartIndex, artistEndIndex);
  const artistTotalPages =
    artistList && artistList.length > 0
      ? Math.ceil(artistList.length / artistPerPage)
      : 1;

  const tuneStartIndex = (tuneCurrentPage - 1) * tunePerPage;
  const tuneEndIndex = tuneStartIndex + tunePerPage;
  const tuneCurrentItem = tuneList?.slice(tuneStartIndex, tuneEndIndex);
  const tuneTotalPages =
    tuneList && tuneList.length > 0
      ? Math.ceil(tuneList.length / tunePerPage)
      : 1;

  // バリデーション用
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const artistNameValue = watch("artist_name");
  const tuneNameValue = watch("tune_name");

  const handleSearch = async (data) => {
    // B003001_楽曲検索BFF実行
    const result = await b003001Model(data);

    // 異常終了であれば、メッセージを表示して終了
    if (!result.success_flg) {
      toast.error(UI_MSG.searchError);
      return;
    }

    // 検索結果が0件の場合
    if (result.code === RESPONSE_CODE.NOT_FOUND) {
      toast.info(UI_MSG.searchNoData);
      return;
    }

    const { artist_info } = result.response_info;
    const { tune_info } = result.response_info;
    setArtistList(artist_info);
    setTuneList(tune_info);
    setArtistCurrentPage(1);
    setTuneCurrentPage(1);
    toast.success(UI_MSG.searchSuccess);
  };

  const allTune = async (data) => {
    // B003002_全楽曲取得BFF実行
    const result = await b003002Model(data);

    // 異常終了であれば、メッセージを表示して終了
    if (!result.success_flg) {
      toast.error(UI_MSG.searchError);
      return;
    }

    // 検索結果が0件の場合
    if (result.code === RESPONSE_CODE.NOT_FOUND) {
      toast.info(UI_MSG.searchNoData);
      return;
    }

    setTuneList(result.response_info);
    setTuneCurrentPage(1);
    toast.success(UI_MSG.searchSuccess);
  };

  return (
    <main className="min-h-screen overflow-auto">
      <div className="w-full min-h-full bg-white p-6">
        <h1 className="text-xl font-semibold mb-4">楽曲検索</h1>

        {/* 検索エリア */}
        <form onSubmit={handleSubmit(handleSearch)}>
          <div className="flex flex-wrap gap-4 items-end mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="artist_name"
                className="text-sm text-gray-600 mb-1"
              >
                歌手名
              </label>
              <input
                id="artist_name"
                type={UI_TYPE.TEXT}
                maxLength={200}
                className="border border-gray-300 rounded px-3 py-2 w-60"
                placeholder="例：YOASOBI"
                {...register("artist_name")}
              />
              {errors.artist_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.artist_name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="tune_name" className="text-sm text-gray-600 mb-1">
                曲名
              </label>
              <input
                id="tune_name"
                type={UI_TYPE.TEXT}
                maxLength={200}
                className="border border-gray-300 rounded px-3 py-2 w-60"
                placeholder="例：アイドル"
                {...register("tune_name")}
              />
              {errors.tune_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.tune_name.message}
                </p>
              )}
            </div>

            <button
              type={UI_TYPE.SUBMIT}
              className="h-10 px-5 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              disabled={!artistNameValue && !tuneNameValue}
            >
              検索
            </button>
          </div>
        </form>

        {/* 歌手一覧表示 */}
        <h1 className="text-xl font-semibold mb-4">歌手一覧</h1>
        <p className="text-red-500 text-sm mt-2">
          ※ 全楽曲取得には時間がかかる場合がございます。
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border-b">イメージ</th>
                <th className="px-4 py-2 border-b">歌手名</th>
                <th className="px-4 py-2 border-b">ジャンル</th>
                <th className="px-4 py-2 border-b">フォロワー数</th>
                <th className="px-4 py-2 border-b">人気度</th>
                <th className="px-4 py-2 border-b">全楽曲取得</th>
              </tr>
            </thead>
            <tbody>
              {artistCurrentItem && artistCurrentItem.length > 0 ? (
                artistCurrentItem.map((item) => (
                  <tr key={item.artist_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      {item.image?.[2]?.url ? (
                        <Image
                          src={item.image[2].url}
                          alt="アーティスト写真"
                          width={64}
                          height={64}
                          className="rounded"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <Link
                        href={item.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {item.artist_name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 border-b">
                      {item.genre && item.genre.length > 0
                        ? item.genre.join(", ")
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {Number(item.follower).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border-b">{item.popularity}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => allTune(item)}
                        className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        全楽曲取得
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center px-4 py-4 text-gray-400"
                  >
                    該当するデータがありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            currentPage={artistCurrentPage}
            totalPages={artistTotalPages}
            onPageChange={(page) => setArtistCurrentPage(page)}
          />
        </div>

        {/* 楽曲一覧表示 */}
        <h1 className="text-xl font-semibold mb-4 pt-4">楽曲一覧</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border-b">イメージ</th>
                <th className="px-4 py-2 border-b">歌手名</th>
                <th className="px-4 py-2 border-b">楽曲名</th>
                <th className="px-4 py-2 border-b">人気度</th>
                <th className="px-4 py-2 border-b">リリース日</th>
              </tr>
            </thead>
            <tbody>
              {tuneCurrentItem && tuneCurrentItem.length > 0 ? (
                tuneCurrentItem.map((item, index) => (
                  <tr key={item.tune_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      <Image
                        src={item.image[2].url}
                        alt="アーティスト写真"
                        width={64}
                        height={64}
                      />
                    </td>
                    <td className="px-4 py-2 border-b">{item.artist_name}</td>
                    <td className="px-4 py-2 border-b">
                      <Link
                        href={item.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {item.tune_name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 border-b">{item.popularity}</td>
                    <td className="px-4 py-2 border-b">{item.release_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center px-4 py-4 text-gray-400"
                  >
                    該当するデータがありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            currentPage={tuneCurrentPage}
            totalPages={tuneTotalPages}
            onPageChange={(page) => setTuneCurrentPage(page)}
          />
        </div>
      </div>
    </main>
  );
}
