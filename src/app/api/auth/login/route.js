// Next.js API Route(ログイン照会API) POST通信
import { schema } from "@/validators/auth/loginSchema";
import { validateRequest } from "@/utils/apiUtils";
import { HTTP_STATUS, RESPONSE_CODE, CONTENT_TYPE } from "@/lib/apiConstants";

export async function POST(req) {
  // バリデーションチェック(エラーがある場合、そのまま返却)
  const result = await validateRequest(schema, await req.json());
  if (result instanceof Response) return result;

  // 正常終了の場合、ログイン情報を返却する
  return new Response(
    JSON.stringify({
      success_flg: true,
      code: RESPONSE_CODE.SUCCESS,
      message: null,
    }),
    {
      status: HTTP_STATUS.OK,
      headers: {
        "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
      },
    }
  );
}
