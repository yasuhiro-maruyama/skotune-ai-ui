// B001001_ログイン照会BFF Validation
import * as yup from "yup";
import { apiValidationMessages } from "@/lib/messages";

const FIELD = {
  user_id: "ユーザーID",
  password: "パスワード",
};

export const schema = yup.object().shape({
  user_id: yup.string().required(function () {
    return apiValidationMessages.required(FIELD[this.path], this.path);
  }),
  password: yup.string().required(function () {
    return apiValidationMessages.required(FIELD[this.path], this.path);
  }),
});
