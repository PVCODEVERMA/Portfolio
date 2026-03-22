"use client";

import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/auth-modal";

export function GlobalAuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen } = useAuth();
  return (
    <AuthModal 
      isOpen={isAuthModalOpen} 
      onClose={() => setIsAuthModalOpen(false)} 
    />
  );
}
