"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import React from "react";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // With `enableSystem`, `theme` can be "system". `resolvedTheme` is what the UI
  // actually renders as ("light" | "dark").
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="relative h-9 w-9 rounded-xl"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <SunIcon
        className={[
          "absolute h-5 w-5 transition-all duration-200",
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
          "text-foreground",
        ].join(" ")}
      />
      <MoonIcon
        className={[
          "absolute h-5 w-5 transition-all duration-200",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0",
          "text-foreground",
        ].join(" ")}
      />
    </Button>
  );
}
