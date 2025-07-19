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

// バリデーションエラーAPI用メッセージ
export const apiValidationMessages = {
  required: (logical_name, field_name) =>
    `${logical_name}(${field_name})：必須チェック`,
  length: (logical_name, field_name, len) =>
    `${logical_name}(${field_name})：桁数チェック(${len}桁のみ)`,
  maxLength: (logical_name, field_name, len) =>
    `${logical_name}(${field_name})：最大桁数チェック(${len}桁まで)`,
  alphaNumeric: (logical_name, field_name) =>
    `${logical_name}(${field_name})：半角英数チェック`,
};

// バリデーションエラーUI用メッセージ
export const uiValidationMessages = {
  required: (logical_name) => `${logical_name}を入力してください。`,
  length: (logical_name, len) => `${logical_name}は${len}桁のみ有効です。`,
  minLength: (logical_name, len) => `${logical_name}は${len}桁以上です。`,
  maxLength: (logical_name, len) => `${logical_name}は最大${len}桁までです。`,
  alphaNumeric: (logical_name) => `${logical_name}は半角英数文字のみ有効です。`,
  password: () => `パスワードは英字・数字・記号を1文字以上含めてください。`,
};
