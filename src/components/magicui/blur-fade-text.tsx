"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { useMemo } from "react";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { y: number; opacity: number; filter: string };
    visible: { y: number; opacity: number; filter: string };
  };
  duration?: number;          // duration for each animation
  characterDelay?: number;    // delay between characters
  delay?: number;             // initial delay
  yOffset?: number;
  animateByCharacter?: boolean;
}

const BlurFadeText = ({
  text,
  className,
  variant,
  duration = 0.0,            // slower duration by default
  characterDelay = 0.8,       // slower per character
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
}: BlurFadeTextProps) => {
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: "blur(8px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };

  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => Array.from(text), [text]);

  if (animateByCharacter) {
    return (
      <div className="flex">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate="visible"
            variants={combinedVariants}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              delay: delay + i * characterDelay,
              ease: "easeOut",
              duration,
            }}
            className={cn("inline-block", className)}
            style={{ width: char.trim() === "" ? "0.2em" : "auto" }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={combinedVariants}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        delay,
        ease: "easeOut",
        duration,
      }}
      className={cn("inline-block", className)}
    >
      {text}
    </motion.span>
  );
};

export default BlurFadeText;
