// B003002_全楽曲取得BFF Validation
import * as yup from "yup";
import { apiValidationMessages } from "@/lib/messages";

const FIELD = { artist_id: "歌手ID" };

export const schema = yup.object().shape({
  artist_id: yup
    .string()
    .required(function () {
      return apiValidationMessages.required(FIELD[this.path], this.path);
    })
    .length(22, function () {
      return apiValidationMessages.length(FIELD[this.path], this.path, 22);
    })
    .matches(/^[A-Za-z0-9]+$/, function () {
      return apiValidationMessages.alphaNumeric(FIELD[this.path], this.path);
    }),
});
