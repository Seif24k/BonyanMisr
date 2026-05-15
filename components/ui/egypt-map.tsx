"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function EgyptMap({
  dots = [],
  lineColor = "#d4af37", // Gold color fitting for Egyptian theme
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Create a focused map for Egypt region - wider for better spacing
  const map = new DottedMap({ 
    height: 100,
    width: 180, // Wider map for better horizontal spacing
    grid: "diagonal",
    countries: ["EGY"] // Focus on Egypt
  });

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  // Project coordinates - adjusted for Egypt's region with wider horizontal spread
  // Egypt bounds: lat 22° to 32°N, lng 25° to 35°E
  const projectPoint = (lat: number, lng: number) => {
    // Map Egypt region to wider viewBox for better spacing
    const minLat = 22, maxLat = 32;
    const minLng = 25, maxLng = 35;

    // Wider horizontal spread (1200 instead of 800) for better pin separation
    const x = ((lng - minLng) / (maxLng - minLng)) * 1200 - 100; // Wider spread
    const y = ((maxLat - lat) / (maxLat - minLat)) * 500; // Keep vertical space

    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[5/2] dark:bg-black bg-white rounded-lg relative font-sans">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="Egypt map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 1200 500"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="10"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="10"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
      {/* City Labels */}
      <svg
        viewBox="0 0 1200 500"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          
          // Calculate label offset based on direction from start to end
          const dx = endPoint.x - startPoint.x;
          const dy = endPoint.y - startPoint.y;
          
          // Position label away from the line direction
          let offsetX = 0;
          let offsetY = -20;
          
          // Adjust offset based on direction
          if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal line - place above or below
            offsetY = dy > 0 ? 20 : -20;
          } else {
            // Vertical line - place left or right
            offsetX = dx > 0 ? 15 : -15;
            offsetY = -5;
          }
          
          return dot.end.label ? (
            <g key={`label-group-${i}`}>
              {/* Background rectangle for better readability */}
              <rect
                x={endPoint.x + offsetX - 30}
                y={endPoint.y + offsetY - 12}
                width="60"
                height="18"
                fill={theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.9)"}
                rx="4"
                stroke={lineColor}
                strokeWidth="0.5"
              />
              <text
                x={endPoint.x + offsetX}
                y={endPoint.y + offsetY}
                fill={lineColor}
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
                className="dark:fill-primary fill-primary"
              >
                {dot.end.label}
              </text>
            </g>
          ) : null;
        })}
        {/* Start point label (Cairo) */}
        {dots.length > 0 && dots[0].start.label && (
          <g key="start-label">
            <rect
              x={projectPoint(dots[0].start.lat, dots[0].start.lng).x - 25}
              y={projectPoint(dots[0].start.lat, dots[0].start.lng).y - 30}
              width="50"
              height="18"
              fill={theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.95)"}
              rx="4"
              stroke={lineColor}
              strokeWidth="1"
            />
            <text
              x={projectPoint(dots[0].start.lat, dots[0].start.lng).x}
              y={projectPoint(dots[0].start.lat, dots[0].start.lng).y - 18}
              fill={lineColor}
              fontSize="12"
              fontWeight="800"
              textAnchor="middle"
              className="dark:fill-primary fill-primary"
            >
              {dots[0].start.label}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
