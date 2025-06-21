// ユーザーModel
import { create } from "zustand";

const userModel = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default userModel;
