// 定数ファイル(API用)

// ステータスコード
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  INTERNAL_SERVER_ERROR: 500,
};

// レスポンスコード
export const RESPONSE_CODE = {
  SUCCESS: "0000",
  NOT_FOUND: "I001",
  INTERNAL_SERVER_ERROR: "E000",
  AUTH_ERROR: "E001",
  VALIDATION_ERROR: "E004",
};

// コンテントタイプ
export const CONTENT_TYPE = {
  APPLICATION_JSON: "application/json",
};
