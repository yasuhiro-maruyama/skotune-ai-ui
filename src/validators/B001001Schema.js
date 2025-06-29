// B001001_ログイン照会BFF バリデーション
import * as yup from "yup";
import { validationMessages } from "@/lib/messages";

export const schema = yup.object().shape({
  user_id: yup.string().required(validationMessages.required("ユーザーID")),
  password: yup.string().required(validationMessages.required("パスワード")),
});
