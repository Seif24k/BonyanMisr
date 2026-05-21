"use client";

import { useState } from "react";
import { Info, MapPin } from "lucide-react";

import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";
import { cn } from "@/lib/utils";

interface EgyptMapInteractiveProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

const egyptCenter: [number, number] = [31.15, 29.45];

export function EgyptMapInteractive({
  dots = [],
  lineColor = "#d4af37",
}: EgyptMapInteractiveProps) {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const headquarters = dots[0]?.start;

  return (
    <div className="group relative">
      <div className="relative overflow-hidden rounded-[28px] border border-[oklch(0.72_0.12_83/0.22)] bg-[oklch(0.14_0.03_255)] p-1 shadow-[0_24px_80px_rgba(10,25,47,0.22)] dark:border-[oklch(0.78_0.12_83/0.28)] dark:shadow-[0_28px_90px_rgba(0,0,0,0.44)] sm:rounded-[36px]">
        <div className="pointer-events-none absolute inset-x-10 top-0 z-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
        <div className="pointer-events-none absolute -left-24 -top-28 z-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />
        <div className="relative h-[430px] overflow-hidden rounded-[24px] sm:h-[520px] sm:rounded-[32px] lg:h-[560px]">
          <Map
            center={egyptCenter}
            zoom={5.35}
            minZoom={4}
            maxZoom={12}
            dragRotate={false}
            touchZoomRotate={false}
            attributionControl={false}
          >
            {dots.map((dot, index) => (
              <MapRoute
                key={`route-${index}`}
                coordinates={[
                  [dot.start.lng, dot.start.lat],
                  [dot.end.lng, dot.end.lat],
                ]}
                color={lineColor}
                width={2.6}
                opacity={0.72}
              />
            ))}

            {dots.map((dot, index) => (
              <MapMarker
                key={`marker-${index}`}
                longitude={dot.end.lng}
                latitude={dot.end.lat}
              >
                <MarkerContent>
                  <MapMarkerPin label={dot.end.label} lineColor={lineColor} />
                </MarkerContent>
                {dot.end.label && (
                  <MarkerPopup className="border-primary/40 bg-[oklch(0.98_0.006_90)] text-[oklch(0.22_0.03_255)] shadow-xl dark:bg-[oklch(0.17_0.025_255)] dark:text-[oklch(0.92_0.015_86)]">
                    <div className="min-w-[8rem]">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                        Service Area
                      </p>
                      <h3 className="mt-1 text-sm font-black">{dot.end.label}</h3>
                    </div>
                  </MarkerPopup>
                )}
              </MapMarker>
            ))}

            {headquarters?.label && (
              <MapMarker longitude={headquarters.lng} latitude={headquarters.lat}>
                <MarkerContent>
                  <MapMarkerPin
                    label={headquarters.label}
                    lineColor={lineColor}
                    isHeadquarters
                  />
                </MarkerContent>
                <MarkerPopup className="border-primary/50 bg-[oklch(0.98_0.006_90)] text-[oklch(0.22_0.03_255)] shadow-xl dark:bg-[oklch(0.17_0.025_255)] dark:text-[oklch(0.92_0.015_86)]">
                  <div className="min-w-[9rem]">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                      Headquarters
                    </p>
                    <h3 className="mt-1 text-base font-black">
                      {headquarters.label}
                    </h3>
                  </div>
                </MarkerPopup>
              </MapMarker>
            )}

            <MapControls
              position="bottom-right"
              showCompass
              showFullscreen
              showLocate={false}
            />
          </Map>

          <button
            type="button"
            onClick={() => setIsInfoExpanded(current => !current)}
            className="absolute bottom-3 left-3 z-20 inline-flex min-h-9 items-center gap-2 rounded-full border border-[oklch(0.82_0.03_255/0.28)] bg-[oklch(0.98_0.006_90/0.92)] px-3 text-xs font-bold text-[oklch(0.30_0.03_255)] shadow-lg backdrop-blur-md transition hover:border-primary/60 dark:border-[oklch(0.82_0.02_86/0.20)] dark:bg-[oklch(0.17_0.025_255/0.88)] dark:text-[oklch(0.88_0.015_86)]"
            aria-label="Toggle map information"
          >
            <Info className="size-4 text-primary" />
            <span
              className={cn(
                "max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300",
                isInfoExpanded && "max-w-56 opacity-100"
              )}
            >
              BonyanMisr Service Locations
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MapMarkerPin({
  label,
  lineColor,
  isHeadquarters = false,
}: {
  label?: string;
  lineColor: string;
  isHeadquarters?: boolean;
}) {
  return (
    <div className="flex -translate-y-1 flex-col items-center">
      <span
        className={cn(
          "grid rounded-full border border-white/80 bg-[oklch(0.98_0.006_90)] shadow-[0_10px_28px_rgba(10,25,47,0.24)] dark:bg-[oklch(0.16_0.025_255)]",
          isHeadquarters ? "size-10" : "size-8"
        )}
      >
        <MapPin
          className={cn("m-auto drop-shadow-sm", isHeadquarters ? "size-6" : "size-5")}
          style={{ color: lineColor, fill: lineColor }}
        />
      </span>
      {label && (
        <span
          className={cn(
            "mt-1 rounded-full border bg-[oklch(0.98_0.006_90/0.96)] px-2 py-0.5 text-[10px] font-black leading-4 text-[oklch(0.24_0.03_255)] shadow-md backdrop-blur dark:bg-[oklch(0.17_0.025_255/0.94)] dark:text-[oklch(0.92_0.015_86)]",
            isHeadquarters && "text-xs"
          )}
          style={{ borderColor: lineColor }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
