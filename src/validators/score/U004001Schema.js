// U004001_採点履歴登録画面 Validation
import * as yup from "yup";
import { uiValidationMessages } from "@/lib/messages";

const FIELD = {
  artist_name: "歌手名",
  tune_name: "曲名",
};

export const schema = yup
  .object()
  .shape({
    artist_name: yup
      .string()
      .max(200, uiValidationMessages.maxLength(FIELD.artist_name, 200)),
    tune_name: yup
      .string()
      .max(200, uiValidationMessages.maxLength(FIELD.tune_name, 200)),
  })
  .test(
    "歌手名(artist_name)、曲名(tune_name)：条件付き必須チェック",
    (value) => !!(value.artist_name?.trim() || value.tune_name?.trim())
  );
