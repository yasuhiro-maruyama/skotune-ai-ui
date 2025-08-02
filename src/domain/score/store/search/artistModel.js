// 歌手Model
"use client";
import { create } from "zustand";

const artistModel = create((set) => ({
  model: [],
  setModel: (model) => set({ model: model }),
}));

export default artistModel;
