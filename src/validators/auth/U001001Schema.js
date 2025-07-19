// U001001_ログイン画面 Validation
import * as yup from "yup";
import { uiValidationMessages, apiValidationMessages } from "@/lib/messages";

export const schema = yup.object().shape({
  user_id: yup
    .string()
    .required(function () {
      return uiValidationMessages.required("メールアドレス");
    })
    .max(200, function () {
      return uiValidationMessages.maxLength("メールアドレス", 200);
    }),
  password: yup
    .string()
    .required(function () {
      return uiValidationMessages.required("パスワード");
    })
    .min(8, function () {
      return uiValidationMessages.minLength("パスワード", 8);
    })
    .max(32, function () {
      return uiValidationMessages.maxLength("パスワード", 32);
    })
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!-/:-@[-`{-~])[!-~]+$/, function () {
      return uiValidationMessages.password();
    }),
});
