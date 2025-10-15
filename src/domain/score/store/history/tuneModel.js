// 履歴楽曲Model
"use client";
import { create } from "zustand";

const tuneModel = create((set) => ({
  model: [],
  setModel: (model) => set({ model: model }),
}));

export default tuneModel;
