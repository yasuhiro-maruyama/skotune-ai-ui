// U004001_採点履歴登録画面 Validation
import * as yup from "yup";
import { uiValidationMessages } from "@/lib/messages";

const FIELD = {
  artist_name: "歌手名",
  tune_name: "曲名",
  model_type: "採点機種",
  score: "点数",
};

export const schema_search = yup
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

export const schema_score = yup.object().shape({
  table: yup.array().of(
    yup.object().shape({
      model_type: yup
        .string()
        .required(uiValidationMessages.required(FIELD.model_type))
        .length(2, uiValidationMessages.length(FIELD.model_type, 2)),
      score: yup
        .number()
        .required(uiValidationMessages.required(FIELD.score))
        .max(100, uiValidationMessages.maxNumber(FIELD.score, 100)),
      // scoring_date: yup
      //   .number()
      //   .required(uiValidationMessages.required(FIELD.score))
      //   .max(100, uiValidationMessages.maxNumber(FIELD.score, 100)),
    })
  ),
});
