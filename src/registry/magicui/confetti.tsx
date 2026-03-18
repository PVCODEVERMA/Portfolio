"use client";

import confetti from "canvas-confetti";
import * as React from "react";

import { Button, ButtonProps } from "@/components/ui/button";

interface ConfettiOptions extends confetti.Options {
  options?: confetti.Options;
}

export const ConfettiButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ConfettiOptions
>(({ options, children, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      ...options,
      origin: { x, y },
    });
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Button ref={ref} {...props} onClick={handleClick}>
      {children}
    </Button>
  );
});
ConfettiButton.displayName = "ConfettiButton";
