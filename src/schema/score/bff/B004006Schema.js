// B004006_採点履歴更新BFF Validation
import * as yup from "yup";
import { apiValidationMessages } from "@/lib/messages";

const FIELD = {
  user_id: { logical_name: "ユーザーID", field_name: "user_id" },
  tune_id: { logical_name: "楽曲ID", field_name: "tune_id" },
  model_type: { logical_name: "採点機種", field_name: "model_type" },
  score: { logical_name: "点数", field_name: "score" },
  scoring_date: { logical_name: "採点日", field_name: "scoring_date" },
  registered_model_type: {
    logical_name: "登録済み採点機種",
    field_name: "registered_model_type",
  },
  registered_scoring_date: {
    logical_name: "登録済み採点日",
    field_name: "registered_scoring_date",
  },
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
  model_type: yup
    .string()
    .required(
      apiValidationMessages.required(
        FIELD.model_type.logical_name,
        FIELD.model_type.field_name
      )
    )
    .length(
      2,
      apiValidationMessages.length(
        FIELD.model_type.logical_name,
        FIELD.model_type.field_name,
        2
      )
    ),
  score: yup
    .number()
    .required(
      apiValidationMessages.required(
        FIELD.score.logical_name,
        FIELD.score.field_name
      )
    )
    .max(
      100,
      apiValidationMessages.maxNumber(
        FIELD.score.logical_name,
        FIELD.score.field_name,
        100
      )
    ),
  scoring_date: yup
    .string()
    .required(
      apiValidationMessages.required(
        FIELD.scoring_date.logical_name,
        FIELD.scoring_date.field_name
      )
    )
    .test("is-valid-date", "存在しない日付です", (value) => {
      if (!value) return false;
      const [year, month, day] = value.split("-").map(Number);
      const date = new Date(value);
      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );
    }),
  // .max(
  //   new Date(),
  //   apiValidationMessages.maxDate(
  //     FIELD.scoring_date.logical_name,
  //     FIELD.scoring_date.field_name
  //   )
  // ),
  registered_model_type: yup
    .string()
    .required(
      apiValidationMessages.required(
        FIELD.registered_model_type.logical_name,
        FIELD.registered_model_type.field_name
      )
    )
    .length(
      2,
      apiValidationMessages.length(
        FIELD.registered_model_type.logical_name,
        FIELD.registered_model_type.field_name,
        2
      )
    ),
  registered_scoring_date: yup
    .string()
    .required(
      apiValidationMessages.required(
        FIELD.registered_scoring_date.logical_name,
        FIELD.registered_scoring_date.field_name
      )
    )
    .test("is-valid-date", "存在しない日付です", (value) => {
      if (!value) return false;
      const [year, month, day] = value.split("-").map(Number);
      const date = new Date(value);
      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );
    }),
  // .max(
  //   new Date(),
  //   apiValidationMessages.maxDate(
  //     FIELD.registered_scoring_date.logical_name,
  //     FIELD.registered_scoring_date.field_name
  //   )
  // ),
});
