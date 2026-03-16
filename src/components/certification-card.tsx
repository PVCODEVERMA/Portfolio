"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CertificationCardProps {
  cert: {
    title: string;
    issuer: string;
    date: string;
    description: string;
    skills?: string[];
    credentialId?: string;
    duration?: string;
    url?: string;
    status?: string;
    type?: string;
    progress?: number;
    badgeColor?: string;
    verified?: boolean;
  };
}

export function CertificationCard({ cert }: CertificationCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const visibleSkills = isExpanded ? cert.skills : cert.skills?.slice(0, 4);
  const moreCount = (cert.skills?.length || 0) - 4;

  return (
    <motion.div
      layout
      className={`border rounded-xl p-5 hover:shadow-lg transition-all duration-300 bg-card/40 backdrop-blur-md hover:bg-card/60 hover:border-primary/30 ${
        cert.badgeColor || "border-primary/10"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg line-clamp-2 text-foreground">
              {cert.title}
            </h3>
            {(cert.status === "completed" || cert.verified) && (
              <CheckCircle2 className="size-5 text-green-500 fill-green-500/10 shrink-0" />
            )}
          </div>
          <p className="text-sm text-foreground line-clamp-1 font-bold">
            {cert.issuer}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <Badge
            variant="outline"
            className="text-xs font-bold border-primary/40 bg-background/80 text-foreground"
          >
            {cert.date}
          </Badge>
          {cert.status === "ongoing" && (
            <Badge
              variant="secondary"
              className="text-xs bg-primary/20 text-foreground border-primary/20 font-bold"
            >
              In Progress
            </Badge>
          )}
          {cert.type === "workshop" && (
            <Badge variant="outline" className="text-xs border-primary/40 bg-background/80 text-foreground font-bold">
              Workshop
            </Badge>
          )}
        </div>
      </div>

      <p className="text-sm text-foreground mb-4 line-clamp-3 min-h-[60px] leading-relaxed font-bold">
        {cert.description}
      </p>

      {cert.skills && cert.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          <AnimatePresence mode="popLayout">
            {visibleSkills?.map((skill) => (
              <motion.span
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                key={skill}
                className="inline-block px-2 py-1 text-xs bg-secondary/50 rounded-md border border-border"
              >
                {skill}
              </motion.span>
            ))}
          </AnimatePresence>
          {!isExpanded && moreCount > 0 && (
            <button
              onClick={() => setIsExpanded(true)}
              className="inline-block px-2 py-1 text-xs text-primary font-bold hover:underline transition-all"
            >
              +{moreCount} more
            </button>
          )}
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="inline-block px-2 py-1 text-xs text-primary font-bold hover:underline transition-all"
            >
              show less
            </button>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t mt-4">
        <div className="text-xs text-muted-foreground truncate max-w-[60%]">
          {cert.credentialId && (
            <span className="truncate">
              ID: {cert.credentialId}
            </span>
          )}
          {cert.duration && (
            <span className="ml-2">• {cert.duration}</span>
          )}
        </div>

        {cert.url && cert.url !== "#" && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 px-3 text-xs shrink-0"
            asChild
          >
            <Link
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-3 w-3" />
              <span className="hidden sm:inline">Verify</span>
              <span className="sm:hidden">View</span>
            </Link>
          </Button>
        )}
      </div>

      {cert.status === "ongoing" && cert.progress && (
        <div className="mt-4 pt-3 border-t">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{cert.progress}%</span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${cert.progress}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
