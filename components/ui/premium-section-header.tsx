"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface PremiumSectionHeaderProps {
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
  className?: string;
  subtitleClassName?: string;
}

export function PremiumSectionHeader({
  title,
  subtitle,
  as = "h2",
  className,
  subtitleClassName,
}: PremiumSectionHeaderProps) {
  const Heading = as === "h1" ? motion.h1 : motion.h2;

  return (
    <div className={cn("text-center", className)}>
      <Heading
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mb-6 inline-block max-w-full break-words text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
      >
        <span
          className="premium-header-shimmer bg-gradient-to-r from-slate-950 via-[#f5a623] to-slate-950 bg-clip-text text-transparent dark:from-white dark:via-[#f5a623] dark:to-white"
          style={{ backgroundSize: "200% auto" }}
        >
          {title}
        </span>
      </Heading>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "120px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto h-1 rounded-full bg-gradient-to-r from-transparent via-[#f5a623] to-transparent"
      />

      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={cn(
            "mx-auto mt-5 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400",
            subtitleClassName
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}

      <style jsx global>{`
        @keyframes premium-header-shimmer {
          0% {
            background-position: 0% center;
          }

          100% {
            background-position: 200% center;
          }
        }

        .premium-header-shimmer {
          animation: premium-header-shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
