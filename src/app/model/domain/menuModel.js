// メニューModel
"use client";
import { create } from "zustand";

const menuModel = create((set) => ({
  menu: null,
  setMenu: (menu) => set({ menu }),
}));

export default menuModel;
