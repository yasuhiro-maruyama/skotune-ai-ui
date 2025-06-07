// BP001Model ログイン照会BFF
import apiClient from "@/app/model/BFFModel";

export async function login(state) {
  const { user_id, password } = state;
  const res = await apiClient.post("/auth/login", { user_id, password });
  return res.data;
}
