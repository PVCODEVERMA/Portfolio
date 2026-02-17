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
        "group flex flex-col sm:flex-row p-3 sm:p-4 transition-all duration-300 hover:shadow-md",
        className
      )}>
        {/* Logo Section - मोबाइल पर सेंटर, डेस्कटॉप पर लेफ्ट */}
        <div className="flex-none flex justify-center sm:justify-start mb-3 sm:mb-0">
          <Avatar className="border size-12 sm:size-14 bg-muted-background dark:bg-foreground opacity-0 group-hover:opacity-100 lg:opacity-100 transition-opacity duration-300">
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
                  <h3 className="font-semibold leading-none text-sm sm:text-base">
                    {title}
                  </h3>
                  {href && href !== "#" && !description && (
                    <ExternalLink className="size-3 sm:size-4 text-muted-foreground" />
                  )}
                  {description && (
                    <ChevronRightIcon
                      className={cn(
                        "size-3 sm:size-4 transform transition-transform duration-300",
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
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground sm:text-right">
                {period}
              </div>
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div className="font-sans text-xs sm:text-sm text-muted-foreground mb-2">
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
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
                className="mt-2 text-xs text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 sm:hidden flex items-center gap-1"
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