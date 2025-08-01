// 採点登録Model
"use client";
import { create } from "zustand";

const scoreModel = create((set) => ({
  score: [],
  setScore: (score) => set({ score: score }),
}));

export default scoreModel;
