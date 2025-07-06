// B003002_全楽曲取得BFF Validation
import * as yup from "yup";
import { validationMessages } from "@/lib/messages";

export const schema = yup.object().shape({
  artist_id: yup
    .string()
    .required(function () {
      return validationMessages.required("歌手ID", this.path);
    })
    .length(22, function () {
      return validationMessages.length("歌手ID", this.path, 22);
    })
    .matches(/^[A-Za-z0-9]+$/, function () {
      return validationMessages.alphaNumeric("歌手ID", this.path);
    }),
});
