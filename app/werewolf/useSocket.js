"use client";

import { useEffect } from "react";
import { useStore } from "@/app/werewolf/store";

export const useSocket = (useEffectFunc, dependency = []) => {
  const { socket } = useStore();

  useEffect(() => {
    if (socket) {
      return useEffectFunc(socket);
    }
  }, [socket, ...dependency]);
};
