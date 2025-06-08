// Next.js API Route(ログイン照会BFF) BP001
import { schema } from "@/validators/BP001Schema";
import { validateRequest } from "@/utils/apiUtils";
import { HTTP_STATUS, RESPONSE_CODE, CONTENT_TYPE } from "@/lib/apiConstants";
import { ap001Model } from "@/app/model/api/post/AP001Model";

export async function POST(req) {
  // バリデーションチェック
  const check = await validateRequest(schema, await req.json());
  if (check instanceof Response) return check;

  // ログイン照会API呼び出し
  const result = await ap001Model(check);

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
