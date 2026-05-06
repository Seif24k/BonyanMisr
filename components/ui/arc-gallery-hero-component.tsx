"use client";

import React, { ReactNode, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

type OrbitStyle = React.CSSProperties &
  Record<
    | "--orbit-start-x"
    | "--orbit-start-y"
    | "--orbit-mid-x"
    | "--orbit-mid-y"
    | "--orbit-end-x"
    | "--orbit-end-y",
    string
  >;

type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  verticalRadiusLg?: number;
  verticalRadiusMd?: number;
  verticalRadiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  centerY?: string;
  className?: string;
  children?: ReactNode;
};

const subscribeToResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getWindowWidth = () => window.innerWidth;
const getServerWindowWidth = () => 1024;

const formatPx = (value: number) => `${Number(value.toFixed(3))}px`;

const getOrbitOffset = ({
  angle,
  phase,
  radius,
  verticalRadius,
  restX,
  restY,
}: {
  angle: number;
  phase: number;
  radius: number;
  verticalRadius: number;
  restX: number;
  restY: number;
}) => {
  const orbitAngleRad = ((angle + phase) * Math.PI) / 180;
  const orbitX = Math.cos(orbitAngleRad) * radius;
  const orbitY = -Math.sin(orbitAngleRad) * verticalRadius;

  return {
    x: formatPx(orbitX - restX),
    y: formatPx(orbitY - restY),
  };
};

const calcFromBase = (
  base: string,
  value: number,
  positiveOperator: "+" | "-"
) => {
  const negativeOperator = positiveOperator === "+" ? "-" : "+";
  const operator = value >= 0 ? positiveOperator : negativeOperator;

  return `calc(${base} ${operator} ${formatPx(Math.abs(value))})`;
};

export const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 480,
  radiusMd = 360,
  radiusSm = 260,
  verticalRadiusLg = radiusLg,
  verticalRadiusMd = radiusMd,
  verticalRadiusSm = radiusSm,
  cardSizeLg = 120,
  cardSizeMd = 100,
  cardSizeSm = 80,
  centerY = "52%",
  className = "",
  children,
}) => {
  const width = useSyncExternalStore(
    subscribeToResize,
    getWindowWidth,
    getServerWindowWidth
  );
  const dimensions =
    width < 640
      ? { radius: radiusSm, verticalRadius: verticalRadiusSm, cardSize: cardSizeSm }
      : width < 1024
        ? { radius: radiusMd, verticalRadius: verticalRadiusMd, cardSize: cardSizeMd }
        : { radius: radiusLg, verticalRadius: verticalRadiusLg, cardSize: cardSizeLg };

  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section
      className={cn(
        "relative flex min-h-screen flex-col overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {images.map((src, index) => {
          const angle = startAngle + step * index;
          const angleRad = (angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * dimensions.radius;
          const y = Math.sin(angleRad) * dimensions.verticalRadius;
          const restY = -y;
          const startOffset = getOrbitOffset({
            angle,
            phase: 150,
            radius: dimensions.radius * 0.82,
            verticalRadius: dimensions.verticalRadius * 1.15,
            restX: x,
            restY,
          });
          const midOffset = getOrbitOffset({
            angle,
            phase: 285,
            radius: dimensions.radius * 0.9,
            verticalRadius: dimensions.verticalRadius * 1.05,
            restX: x,
            restY,
          });
          const endOffset = getOrbitOffset({
            angle,
            phase: 420,
            radius: dimensions.radius * 0.96,
            verticalRadius: dimensions.verticalRadius * 0.98,
            restX: x,
            restY,
          });

          return (
            <div
              data-arc-gallery-card
              key={`${src}-${index}`}
              className="absolute animate-arc-gallery-card-in opacity-0 will-change-transform"
              style={{
                animationDelay: `${350 + index * 115}ms`,
                animationFillMode: "forwards",
                "--orbit-start-x": startOffset.x,
                "--orbit-start-y": startOffset.y,
                "--orbit-mid-x": midOffset.x,
                "--orbit-mid-y": midOffset.y,
                "--orbit-end-x": endOffset.x,
                "--orbit-end-y": endOffset.y,
                width: dimensions.cardSize,
                height: dimensions.cardSize,
                left: calcFromBase("50%", x, "+"),
                top: calcFromBase(centerY, y, "-"),
                transform: "translate(-50%, -50%)",
                zIndex: count - index,
              } as OrbitStyle}
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-[28px] bg-white shadow-[0_28px_70px_rgba(0,0,0,0.42)] ring-1 ring-[#d4af37]/25 transition-transform duration-500 hover:scale-105 dark:bg-gray-800"
                style={{
                  transform: `rotate(${(angle - 90) / 14}deg)`,
                }}
              >
                <div
                  aria-label={`Project detail ${index + 1}`}
                  className="h-full w-full bg-cover bg-center"
                  role="img"
                  style={{
                    backgroundImage: `url(${src}), url(https://placehold.co/400x400/0f172a/d4af37?text=Bonyan)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 flex min-h-screen flex-1 items-center justify-center px-6">
        <div
          className="animate-arc-gallery-content-in opacity-0"
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          {children ?? (
            <div className="mx-auto max-w-2xl px-6 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Rediscover Your Memories with AI
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Our intelligent platform finds, organizes, and brings your most
                cherished moments back to life.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes arc-gallery-card-in {
          from {
            opacity: 0;
            filter: blur(14px);
            translate: var(--orbit-start-x) var(--orbit-start-y);
            scale: 0.68;
          }
          34% {
            opacity: 0.86;
            filter: blur(5px);
            translate: var(--orbit-mid-x) var(--orbit-mid-y);
            scale: 0.9;
          }
          68% {
            opacity: 1;
            filter: blur(1px);
            translate: var(--orbit-end-x) var(--orbit-end-y);
            scale: 1.02;
          }
          to {
            opacity: 1;
            filter: blur(0);
            translate: 0 0;
            scale: 1;
          }
        }

        @keyframes arc-gallery-content-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-arc-gallery-card-in {
          animation-name: arc-gallery-card-in;
          animation-duration: 2.35s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-arc-gallery-content-in {
          animation-name: arc-gallery-content-in;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
      `}</style>
    </section>
  );
};
