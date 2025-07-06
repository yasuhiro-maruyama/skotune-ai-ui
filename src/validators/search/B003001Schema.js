// B003001_楽曲検索BFF Validation
import * as yup from "yup";
import { validationMessages } from "@/lib/messages";

export const schema = yup
  .object()
  .shape({
    artist_name: yup
      .string()
      .max(200, function () {
        return validationMessages.maxLength("歌手名", this.path, 200);
      })
      .notRequired(),
    tune_name: yup
      .string()
      .max(200, function () {
        return validationMessages.maxLength("曲名", this.path, 200);
      })
      .notRequired(),
  })
  .test(
    "歌手名(artist_name)、曲名(tune_name)：条件付き必須チェック",
    (value) => !!(value.artist_name?.trim() || value.tune_name?.trim())
  );
