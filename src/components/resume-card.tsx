"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  className?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  className,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <Card className={cn(
        "group flex flex-col sm:flex-row p-4 sm:p-5 transition-all duration-300 hover:shadow-md bg-card/60 backdrop-blur-xl border border-primary/20 hover:border-primary/40",
        className
      )}
      role="button"
      tabIndex={0}
      >
        {/* Logo Section - मोबाइल पर सेंटर, डेस्कटॉप पर लेफ्ट */}
        <div className="flex-none flex justify-start mb-3 sm:mb-0">
          <Avatar className="border size-10 sm:size-14 bg-muted-background dark:bg-foreground transition-opacity duration-300">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain p-1"
            />
            <AvatarFallback className="text-xs sm:text-sm">
              {altText[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Content Section */}
        <div className="flex-grow sm:ml-4 w-full">
          <CardHeader className="p-0">
            {/* Header - मोबाइल पर स्टैक, डेस्कटॉप पर रो */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              {/* Title and Badges */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-black leading-tight text-sm sm:text-base text-foreground">
                    {title}
                  </h3>
                  {href && href !== "#" && !description && (
                    <ExternalLink className="size-3 sm:size-4 text-muted-foreground shrink-0" />
                  )}
                  {description && (
                    <ChevronRightIcon
                      className={cn(
                        "size-3 sm:size-4 transform transition-transform duration-300 shrink-0",
                        isExpanded ? "rotate-90" : "rotate-0"
                      )}
                    />
                  )}
                </div>

                {/* Badges - मोबाइल पर स्टैक, डेस्कटॉप पर रैप */}
                {badges && badges.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {badges.slice(0, 3).map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                    {badges.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-0.5"
                      >
                        +{badges.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Period - मोबाइल पर लेफ्ट, डेस्कटॉप पर राइट */}
              <div className="text-[11px] sm:text-xs tabular-nums text-foreground sm:text-right font-black tracking-tight opacity-70">
                {period}
              </div>
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div className="font-sans text-xs sm:text-sm text-foreground mb-2 font-bold">
                {subtitle}
              </div>
            )}
          </CardHeader>

          {/* Description with Animation */}
          {description && (
            <CardContent className="p-0 mt-2">
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  height: isExpanded ? "auto" : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden"
              >
                <p className="text-xs sm:text-sm text-foreground font-bold leading-relaxed">
                  {description}
                </p>
                {href && href !== "#" && (
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className="text-xs gap-1 hover:bg-secondary transition-colors"
                    >
                      <ExternalLink className="size-3" />
                      Visit Website
                    </Badge>
                  </div>
                )}
              </motion.div>

              {/* Show More/Less Button for Mobile */}
              <button
                type="button"
                className="mt-2 text-xs text-primary hover:text-primary/80 sm:hidden flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? "Show Less" : "Show More"}
                <ChevronRightIcon
                  className={cn(
                    "size-3 transform transition-transform duration-300",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </button>
            </CardContent>
          )}
        </div>
      </Card>
    </Link>
  );
};