// U001001_ログイン画面 Validation
import * as yup from "yup";
import { uiValidationMessages, apiValidationMessages } from "@/lib/messages";

export const schema = yup.object().shape({
  user_id: yup.string().required(function () {
    return uiValidationMessages.required("メールアドレス");
  }),
  password: yup.string().required(function () {
    return uiValidationMessages.required("パスワード");
  }),
});
