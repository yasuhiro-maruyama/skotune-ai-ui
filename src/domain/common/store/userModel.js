// ユーザーModel
"use client";
import { create } from "zustand";

const userModel = create((set) => ({
  model: null,
  setModel: (model) => set({ model }),
}));

export default userModel;
