// 定数ファイル(メッセージ用)
export const API_MSG = {
  internalServerError: "内部サーバーエラーが発生しました。",
  validationError: "バリデーションエラーが発生しました。",
};

export const UI_MSG = {
  authError:
    "ログイン情報が正しくありません。メールアドレスまたはパスワードが正しいかご確認お願いします。",
};

// バリデーションエラーメッセージ
export const validationMessages = {
  required: (field_name) => `必須項目(${field_name})`,
  // minLength: (field_name, len) =>
  //   `${field_name}は${len}文字以上で入力してください`,
  // invalidEmail: "正しいメールアドレスを入力してください",
};
