// B004002_楽曲予約登録BFF Validation
import * as yup from "yup";
import { apiValidationMessages } from "@/lib/messages";

const FIELD = {
  user_id: { logical_name: "ユーザーID", field_name: "user_id" },
  artist_id: { logical_name: "歌手ID", field_name: "artist_id" },
  artist_name: { logical_name: "歌手名", field_name: "artist_name" },
  tune_id: { logical_name: "楽曲ID", field_name: "tune_id" },
  tune_name: { logical_name: "楽曲名", field_name: "tune_name" },
  model_type: { logical_name: "採点機種", field_name: "model_type" },
  score: { logical_name: "点数", field_name: "score" },
  scoring_date: { logical_name: "採点日", field_name: "scoring_date" },
};
export const schema = yup.object().shape({
  user_id: yup
    .string()
    .required(function () {
      return apiValidationMessages.required(
        FIELD.user_id.logical_name,
        FIELD.user_id.field_name
      );
    })
    .email(function () {
      return apiValidationMessages.email(
        FIELD.user_id.logical_name,
        FIELD.user_id.field_name
      );
    })
    .max(200, function () {
      return apiValidationMessages.maxLength(
        FIELD.user_id.logical_name,
        FIELD.user_id.field_name,
        200
      );
    }),
  artist_id: yup
    .string()
    .required(
      apiValidationMessages.required(
        FIELD.artist_id.logical_name,
        FIELD.artist_id.field_name
      )
    )
    .length(
      22,
      apiValidationMessages.length(
        FIELD.artist_id.logical_name,
        FIELD.artist_id.field_name,
        22
      )
    )
    .matches(
      /^[A-Za-z0-9]+$/,
      apiValidationMessages.alphaNumeric(
        FIELD.artist_id.logical_name,
        FIELD.artist_id.field_name
      )
    ),
  artist_name: yup
    .string()
    .required(
      apiValidationMessages.required(
        FIELD.artist_name.logical_name,
        FIELD.artist_name.field_name
      )
    )
    .max(
      200,
      apiValidationMessages.maxLength(
        FIELD.artist_name.logical_name,
        FIELD.artist_name.field_name,
        200
      )
    ),
  tune_id: yup
    .string()
    .required(
      apiValidationMessages.required(
        FIELD.tune_id.logical_name,
        FIELD.tune_id.field_name
      )
    )
    .length(
      22,
      apiValidationMessages.length(
        FIELD.tune_id.logical_name,
        FIELD.tune_id.field_name,
        22
      )
    )
    .matches(
      /^[A-Za-z0-9]+$/,
      apiValidationMessages.alphaNumeric(
        FIELD.tune_id.logical_name,
        FIELD.tune_id.field_name
      )
    ),
  tune_name: yup
    .string()
    .required(
      apiValidationMessages.required(
        FIELD.tune_name.logical_name,
        FIELD.tune_name.field_name
      )
    )
    .max(
      200,
      apiValidationMessages.maxLength(
        FIELD.tune_name.logical_name,
        FIELD.tune_name.field_name,
        200
      )
    ),
  model_type: yup
    .string()
    .length(
      2,
      apiValidationMessages.length(
        FIELD.model_type.logical_name,
        FIELD.model_type.field_name,
        2
      )
    )
    .notRequired(),
  score: yup
    .number()
    .max(
      100,
      apiValidationMessages.maxNumber(
        FIELD.score.logical_name,
        FIELD.score.field_name,
        100
      )
    ),
  scoring_date: yup
    .date()
    .max(
      new Date(),
      apiValidationMessages.maxDate(
        FIELD.scoring_date.logical_name,
        FIELD.scoring_date.field_name
      )
    ),
});
