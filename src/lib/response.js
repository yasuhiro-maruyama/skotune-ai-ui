import { NextResponse } from "next/server.js";
import { HTTP_STATUS, RESPONSE_CODE } from "@/lib/apiConstants";
import { API_MSG } from "@/lib/messages";

// 正常レスポンス
export function successResponse(result) {
  return NextResponse.json(
    {
      success_flg: true,
      code: RESPONSE_CODE.SUCCESS,
      message: null,
      response_info: result,
    },
    {
      status: HTTP_STATUS.OK,
    }
  );
}

// 内部サーバーエラー
export function internalServerErrorResponse() {
  return NextResponse.json(
    {
      success_flg: false,
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      message: API_MSG.internalServerError,
    },
    {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    }
  );
}

// 認証エラー
export function authErrorResponse() {
  return NextResponse.json(
    {
      success_flg: false,
      code: RESPONSE_CODE.AUTH_ERROR,
      message: API_MSG.authError,
    },
    {
      status: HTTP_STATUS.UNAUTHORIZED,
    }
  );
}
