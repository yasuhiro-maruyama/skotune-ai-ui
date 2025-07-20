// B001001_ログイン照会BFF Validation
import * as yup from "yup";
import { apiValidationMessages } from "@/lib/messages";

const FIELD = {
  user_id: { logical_name: "ユーザーID", field_name: "user_id" },
  password: { logical_name: "パスワード", field_name: "password" },
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
  password: yup
    .string()
    .required(function () {
      return apiValidationMessages.required(
        FIELD.password.logical_name,
        FIELD.password.field_name
      );
    })
    .min(8, function () {
      return apiValidationMessages.minLength(
        FIELD.password.logical_name,
        FIELD.password.field_name,
        8
      );
    })
    .max(32, function () {
      return apiValidationMessages.maxLength(
        FIELD.password.logical_name,
        FIELD.password.field_name,
        32
      );
    })
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!-/:-@[-`{-~])[!-~]+$/, function () {
      return apiValidationMessages.password(
        FIELD.password.logical_name,
        FIELD.password.field_name
      );
    }),
});
