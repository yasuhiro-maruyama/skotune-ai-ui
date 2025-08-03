// B004003_楽曲予約取得BFF Validation
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
});
