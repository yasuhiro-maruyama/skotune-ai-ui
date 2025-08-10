// B004004_楽曲予約削除BFF Validation
import * as yup from "yup";
import { apiValidationMessages } from "@/lib/messages";

const FIELD = {
  user_id: { logical_name: "ユーザーID", field_name: "user_id" },
  tune_id: { logical_name: "楽曲ID", field_name: "tune_id" },
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
});
