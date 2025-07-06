// 定数ファイル(メッセージ用)
// API用メッセージ
export const API_MSG = {
  internalServerError: "内部サーバーエラーが発生しました。",
  validationError: "バリデーションエラーが発生しました。",
  authError: "認証エラーが発生しました。",
};

// UI用メッセージ
export const UI_MSG = {
  authError:
    "ログイン情報が正しくありません。メールアドレスまたはパスワードが正しいかご確認お願いします。",
  maintenanceError:
    "システムのメンテナンス中のため、アクセスすることができません。",
};

// バリデーションエラー用メッセージ
export const validationMessages = {
  required: (logical_name, field_name) =>
    `${logical_name}(${field_name})：必須チェック`,
  length: (logical_name, field_name, len) =>
    `${logical_name}(${field_name})：桁数チェック(${len}桁のみ)`,
  maxLength: (logical_name, field_name, len) =>
    `${logical_name}(${field_name})：最大桁数チェック(${len}桁まで)`,
  alphaNumeric: (logical_name, field_name) =>
    `${logical_name}(${field_name})：半角英数チェック`,
};
