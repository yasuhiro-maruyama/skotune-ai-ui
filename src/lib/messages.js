// 定数ファイル(メッセージ用)
export const internalServerError = "内部サーバーエラーが発生しました。";
export const validationError = "バリデーションエラーが発生しました。";

// バリデーションエラーメッセージ
export const validationMessages = {
  required: (field_name) => `必須項目(${field_name})`,
  // minLength: (field_name, len) =>
  //   `${field_name}は${len}文字以上で入力してください`,
  // invalidEmail: "正しいメールアドレスを入力してください",
};
