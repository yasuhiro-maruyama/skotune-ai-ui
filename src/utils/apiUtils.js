// 共通関数(API用)
import logger from "@/lib/logger";
import { ValidationError } from "yup";
import { HTTP_STATUS, RESPONSE_CODE, CONTENT_TYPE } from "@/lib/apiConstants";
import { API_MSG } from "@/lib/messages";

// バリデーションチェック(共通)
export async function validateRequest(schema, data) {
  try {
    const result = await schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    // 問題なし
    return result;
  } catch (error) {
    // エラー情報返却
    if (error instanceof ValidationError) {
      // バリデーションエラー
      logger.error(API_MSG.validationError, error);
      return new Response(
        JSON.stringify({
          success_flg: false,
          code: RESPONSE_CODE.VALIDATION_ERROR,
          message: API_MSG.validationError,
          error: error.errors,
        }),
        {
          status: HTTP_STATUS.BAD_REQUEST,
          headers: {
            "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
          },
        }
      );
    }
    // 内部サーバーエラー
    logger.error(API_MSG.internalServerError, error);
    return new Response(
      JSON.stringify({
        success_flg: false,
        code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: API_MSG.internalServerError,
        error,
      }),
      {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        headers: {
          "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
        },
      }
    );
  }
}
