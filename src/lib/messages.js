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
    "システムメンテナンス中のため、アクセスすることができません。",
  searchError:
    "検索機能に異常が発生いたしました。時間をおいて確認してください。",
  searchSuccess: "楽曲の取得が正常に完了しました。",
  searchNoData: "検索結果がありません。",
};

// バリデーションエラーAPI用メッセージ
export const apiValidationMessages = {
  required: (logical_name, field_name) =>
    `${logical_name}(${field_name})：必須チェック`,
  length: (logical_name, field_name, len) =>
    `${logical_name}(${field_name})：桁数チェック(${len}桁のみ)`,
  minLength: (logical_name, field_name, len) =>
    `${logical_name}(${field_name})：最小桁数チェック(${len}桁以上)`,
  maxLength: (logical_name, field_name, len) =>
    `${logical_name}(${field_name})：最大桁数チェック(${len}桁まで)`,
  alphaNumeric: (logical_name, field_name) =>
    `${logical_name}(${field_name})：半角英数チェック`,
  email: (logical_name, field_name) =>
    `${logical_name}(${field_name})：メールアドレスチェック`,
  password: (logical_name, field_name) =>
    `${logical_name}(${field_name})：パスワードチェック`,
};

// バリデーションエラーUI用メッセージ
export const uiValidationMessages = {
  required: (logical_name) => `${logical_name}を入力してください。`,
  length: (logical_name, len) => `${logical_name}は${len}桁のみ有効です。`,
  minLength: (logical_name, len) => `${logical_name}は${len}桁以上です。`,
  maxLength: (logical_name, len) => `${logical_name}は最大${len}桁までです。`,
  alphaNumeric: (logical_name) => `${logical_name}は半角英数文字のみ有効です。`,
  email: () => "正しいメールアドレスを入力してください。",
  password: () => "パスワードは英字・数字・記号を1文字以上含めてください。",
};
