"use client";
import { create } from "zustand";

export const useStore = create((set) => ({
  socket: null,
  // en: true
  // tw: false
  language: true,

  // function
  setSocket: (socket) => set({ socket }),
  setLanguage: (language) => set({ language }),
  changeLanguage: () => set((store) => ({ language: !store.language })),
}));
