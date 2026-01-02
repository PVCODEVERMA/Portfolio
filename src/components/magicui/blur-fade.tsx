"use client";

import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  yOffset?: number;
  xOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.5,
  delay = 0,
  yOffset = 10,
  xOffset = 0,
  inView = true,
  inViewMargin = "-50px",
  blur = "8px",
}: BlurFadeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const options = {
    root: null,
    rootMargin: inViewMargin,
    threshold: 0.1,
    once: true
  };

  const isInView = useInView(ref, options);
  
  const defaultVariants: Variants = {
    hidden: { 
      y: yOffset,
      x: xOffset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: { 
      y: 0,
      x: 0,
      opacity: 1,
      filter: `blur(0px)`,
    },
  };

  const combinedVariants = variant || defaultVariants;

  const shouldAnimate = !inView || isInView;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay,
          duration,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlurFade;