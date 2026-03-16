"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface LoadingContextType {
  isActive: boolean;
  startLoading: (duration?: number) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);

  const startLoading = useCallback((duration: number = 2000) => {
    setIsActive(true);
    if (duration > 0) {
      setTimeout(() => {
        setIsActive(false);
      }, duration);
    }
  }, []);

  const stopLoading = useCallback(() => {
    setIsActive(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isActive, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
