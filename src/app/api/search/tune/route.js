// B003001_楽曲検索BFF
"use server";
import { schema } from "@/validators/search/B003001Schema";
import { validateRequest } from "@/utils/apiUtils";
import { a003001Model } from "@/app/model/api/search/A003001Model";
import { a003002Model } from "@/app/model/api/search/A003002Model";
import { successResponse, internalServerErrorResponse } from "@/lib/response";

export async function POST(req) {
  // バリデーションチェック
  const param = await validateRequest(schema, await req.json());
  if (param instanceof Response) return param;

  let a003001Result;

  // リクエスト.歌手名が存在する場合
  if (param.artist_name) {
    // 歌手取得API実行
    a003001Result = await a003001Model(param);
    // 異常終了の場合、内部サーバーエラー
    if (!a003001Result.success_flg) return internalServerErrorResponse();
  }

  // 楽曲取得API実行
  const a003002Result = await a003002Model(param);
  // 異常終了の場合、内部サーバーエラー
  if (!a003002Result.success_flg) return internalServerErrorResponse();

  // 正常終了
  return successResponse({
    artist_info: a003001Result?.response_info ?? null,
    tune_info: a003002Result.response_info,
  });
}
