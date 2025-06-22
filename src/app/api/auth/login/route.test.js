// BP001_ログイン照会BFF テスト
import bffClient from "@/app/model/bff/BFFModel";
import apiClient from "@/app/model/api/APIModel";
import { HTTP_STATUS, RESPONSE_CODE } from "@/lib/apiConstants";
import { API_MSG } from "@/lib/messages";
import { bp001Model } from "@/app/model/bff/BP001Model";
import { POST } from "@/app/api/auth/login/route";

// bffClientをモック
jest.mock("@/app/model/bff/BFFModel", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

// apiClientをモック
jest.mock("@/app/model/api/APIModel", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

// Redisをモック
jest.mock("@/lib/redis", () => ({
  set: jest.fn().mockResolvedValue("OK"),
}));

// リクエスト(正常系)
const successReq = {
  user_id: "test@gmail.com",
  password: "test_Pass_1234",
};

// レスポンス(正常系)
const successRes = {
  success_flg: true,
  code: RESPONSE_CODE.SUCCESS,
  message: null,
  user_info: {
    user_id: "test@gmail.com",
    user_name: "テスト太郎",
    administrator_flg: false,
  },
};

// レスポンス(異常系：バリデーションエラー)
const validationErrorRes = {
  success_flg: false,
  code: RESPONSE_CODE.VALIDATION_ERROR,
  message: API_MSG.validationError,
};

// レスポンス(異常系：認証エラー) API
const apiAuthErrorRes = {
  success_flg: false,
  code: RESPONSE_CODE.NOT_FOUND,
  message: "ユーザー情報が取得できませんでした。",
  user_info: null,
};

// レスポンス(異常系：認証エラー) BFF
const bffAuthErrorRes = {
  success_flg: false,
  code: RESPONSE_CODE.AUTH_ERROR,
  message: API_MSG.authError,
};

const ENV = process.env;

beforeEach(() => {
  process.env = {
    ...ENV,
    JWT_SECRET: "JWT_SECRET",
    COOKIE_TOKEN: "COOKIE_TOKEN",
  };
});

afterEach(() => {
  process.env = ENV;
});

describe("BP001_ログイン照会BFF_Model_テスト実行", () => {
  it("S01_正常系：通信成功", async () => {
    // モック作成
    bffClient.post.mockResolvedValue({ data: successRes });

    // テスト対象実行
    const res = await bp001Model(successReq);

    // 期待値確認
    expect(res).toEqual(successRes);
  });

  it("E01_異常系：通信失敗", async () => {
    // モック作成(通信失敗)
    bffClient.post.mockRejectedValue(new Error("E01_異常系：通信失敗"));

    // テスト対象実行
    const res = await bp001Model(successReq);

    // 期待値確認
    expect(res.success_flg).toBe(false);
  });
});

describe("BP001_ログイン照会BFF_テスト実行", () => {
  it("S01_正常系：認証成功", async () => {
    // モック作成
    apiClient.post.mockResolvedValue({ data: successRes });

    // リクエスト設定
    const req = {
      json: async () => successReq,
    };

    // テスト対象実行
    const res = await POST(req);
    const result = await res.json();

    // 期待値確認
    expect(res.status).toBe(HTTP_STATUS.OK);
    expect(res.cookies.get("COOKIE_TOKEN")).toBeDefined();
    expect(result).toEqual(successRes);
  });

  it("V01_異常系：バリデーションエラー(ユーザーID：必須チェック)", async () => {
    // モック作成
    apiClient.post.mockResolvedValue({ data: successRes });

    // リクエスト設定
    const req = {
      json: async () => ({
        password: "test_Pass_1234",
      }),
    };

    // テスト対象実行
    const res = await POST(req);
    const result = await res.json();

    // 期待値確認
    expect(res.status).toBe(HTTP_STATUS.VALIDATION_ERROR);
    expect(result).toEqual(validationErrorRes);
  });

  it("V02_異常系：バリデーションエラー(パスワード：必須チェック)", async () => {
    // モック作成
    apiClient.post.mockResolvedValue({ data: successRes });

    // リクエスト設定
    const req = {
      json: async () => ({
        user_id: "test@gmail.com",
      }),
    };

    // テスト対象実行
    const res = await POST(req);
    const result = await res.json();

    // 期待値確認
    expect(res.status).toBe(HTTP_STATUS.VALIDATION_ERROR);
    expect(result).toEqual(validationErrorRes);
  });

  it("E01_異常系：認証エラー", async () => {
    // モック作成
    apiClient.post.mockResolvedValue({ data: apiAuthErrorRes });

    // リクエスト設定
    const req = {
      json: async () => successReq,
    };

    // テスト対象実行
    const res = await POST(req);
    const result = await res.json();

    // 期待値確認
    expect(res.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    expect(result).toEqual(bffAuthErrorRes);
  });

  it("E02_異常系：通信失敗", async () => {
    // モック作成(通信失敗)
    apiClient.post.mockRejectedValue(new Error("E02_異常系：通信失敗"));

    // リクエスト設定
    const req = {
      json: async () => successReq,
    };

    // テスト対象実行
    const res = await POST(req);
    const result = await res.json();

    // 期待値確認
    expect(res.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    expect(result).toEqual(bffAuthErrorRes);
  });
});
