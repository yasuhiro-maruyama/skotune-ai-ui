// B003001_楽曲検索BFF Validation
import * as yup from "yup";
import { apiValidationMessages } from "@/lib/messages";

const FIELD = {
  artist_name: "歌手名",
  tune_name: "曲名",
};

export const schema = yup
  .object()
  .shape({
    artist_name: yup
      .string()
      .max(200, function () {
        return apiValidationMessages.maxLength(
          FIELD[this.path],
          this.path,
          200
        );
      })
      .notRequired(),
    tune_name: yup
      .string()
      .max(200, function () {
        return apiValidationMessages.maxLength(
          FIELD[this.path],
          this.path,
          200
        );
      })
      .notRequired(),
  })
  .test(
    "歌手名(artist_name)、曲名(tune_name)：条件付き必須チェック",
    (value) => !!(value.artist_name?.trim() || value.tune_name?.trim())
  );
