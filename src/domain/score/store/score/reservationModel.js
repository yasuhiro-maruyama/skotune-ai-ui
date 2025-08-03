// 採点登録Model
"use client";
import { create } from "zustand";

const reservationModel = create((set) => ({
  model: [],
  setModel: (model) => set({ model: model }),
}));

export default reservationModel;
