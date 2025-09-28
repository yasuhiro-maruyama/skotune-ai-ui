// B000_001_共通機能_メニュー機能取得BFF Validation
import * as yup from "yup";
import { apiValidationMessages } from "@/lib/messages";

const FIELD = {
  administrator_flg: {
    logical_name: "管理者フラグ",
    field_name: "administrator_flg",
  },
};
export const schema = yup.object({
  administrator_flg: yup
    .boolean()
    .required(
      apiValidationMessages.required(
        FIELD.administrator_flg.logical_name,
        FIELD.administrator_flg.field_name
      )
    ),
});
