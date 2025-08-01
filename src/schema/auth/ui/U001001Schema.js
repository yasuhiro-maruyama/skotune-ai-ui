// U001001_ログイン画面 Validation
import * as yup from "yup";
import { uiValidationMessages } from "@/lib/messages";

const FIELD = {
  user_id: "メールアドレス",
  password: "パスワード",
};

export const schema = yup.object().shape({
  user_id: yup
    .string()
    .required(uiValidationMessages.required(FIELD.user_id))
    .email(uiValidationMessages.email())
    .max(200, uiValidationMessages.maxLength(FIELD.user_id, 200)),
  password: yup
    .string()
    .required(uiValidationMessages.required(FIELD.password))
    .min(8, uiValidationMessages.minLength(FIELD.password, 8))
    .max(32, uiValidationMessages.maxLength(FIELD.password, 32))
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!-/:-@[-`{-~])[!-~]+$/,
      uiValidationMessages.password()
    ),
});
