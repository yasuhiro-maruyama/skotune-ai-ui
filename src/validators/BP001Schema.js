// Next.js API Route(ログイン照会BFF) バリデーション
import * as yup from "yup";
import { validationMessages } from "@/lib/messages";

export const schema = yup.object().shape({
  mail_address: yup
    .string()
    .required(validationMessages.required("メールアドレス")),
  password: yup.string().required(validationMessages.required("パスワード")),
});
