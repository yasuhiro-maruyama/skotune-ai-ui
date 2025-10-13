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

// HTTPメソッド
export const HTTP_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
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

// Redisキー
export const REDIS_KEY = {
  COMMON_MENU: "common_menu",
  COMMON_CODE: "common_code",
  AUTH_TOKEN: "auth_token",
  SCORE_RESERVATION: "score_reservation",
  SCORE_HISTORY: "score_history",
};

// Redis用定数
export const REDIS_OPTION = {
  EXPIRE: "EX",
};

// 環境
export const ENV = {
  PRODUCTION: "production",
  STAGING: "staging",
  DEVELOPMENT: "development",
};

// Cookie用定数
export const COOKIE_OPTION = {
  SAME_SITE: "lax",
};

// コード用定数
export const CODE = {
  MODEL_TYPE: "0001",
};
