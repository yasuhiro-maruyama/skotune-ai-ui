// AP001Model ログイン照会API
import apiClient from "@/app/model/APIModel";

export async function ap001Model(state) {
  const { user_id, password } = state;
  const res = await apiClient.post("/auth/login", { user_id, password });
  return res.data;
}
