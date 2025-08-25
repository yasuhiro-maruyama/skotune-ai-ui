// B000_002_共通機能_コード値取得BFF Validation
import * as yup from "yup";
import { apiValidationMessages } from "@/lib/messages";

const FIELD = {
  code_id: { logical_name: "コードID", field_name: "code_id" },
};
export const schema = yup.object().shape({
  code_id: yup.string().length(4, function () {
    return apiValidationMessages.length(
      FIELD.code_id.logical_name,
      FIELD.code_id.field_name,
      4
    );
  }),
});
