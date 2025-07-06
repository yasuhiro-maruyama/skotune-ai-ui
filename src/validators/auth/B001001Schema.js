// B001001_ログイン照会BFF Validation
import * as yup from "yup";
import { validationMessages } from "@/lib/messages";

export const schema = yup.object().shape({
  user_id: yup.string().required(function () {
    return validationMessages.required("ユーザーID", this.path);
  }),
  password: yup.string().required(function () {
    return validationMessages.required("パスワード", this.path);
  }),
});
