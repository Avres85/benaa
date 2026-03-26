"use client";

import { createContext, useContext, useMemo, useState } from "react";

type WaitlistContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | undefined>(undefined);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<WaitlistContextValue>(
    () => ({
      isOpen,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>;
}

export function useWaitlistModal() {
  const context = useContext(WaitlistContext);

  if (!context) {
    throw new Error("useWaitlistModal must be used within WaitlistProvider");
  }

  return context;
}
