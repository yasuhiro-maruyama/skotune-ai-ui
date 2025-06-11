// BP001Model ログイン照会BFF
import apiClient from "@/app/model/BFFModel";

export async function bp001Model(state) {
  const { mail_address, password } = state;
  const res = await apiClient.post("/auth/login", { mail_address, password });
  return res.data;
}
