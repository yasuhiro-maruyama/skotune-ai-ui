// 定数ファイル(API用)

// ステータスコード
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// レスポンスコード
export const RESPONSE_CODE = {
  SUCCESS: "0000",
  INTERNAL_SERVER_ERROR: "E000",
  VALIDATION_ERROR: "E004",
};

// コンテントタイプ
export const CONTENT_TYPE = {
  APPLICATION_JSON: "application/json",
};
