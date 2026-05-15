"use client";

import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "next-themes";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

const defaultStyles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
};

type MapStyleOption = string | MapLibreGL.StyleSpecification;

type MapProps = {
  children?: ReactNode;
  styles?: {
    light?: MapStyleOption;
    dark?: MapStyleOption;
  };
} & Omit<MapLibreGL.MapOptions, "container" | "style">;

const DefaultLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex gap-1">
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse" />
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
    </div>
  </div>
);

function Map({ children, styles, ...props }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreGL.Map | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const { resolvedTheme } = useTheme();

  const mapStyles = {
    dark: styles?.dark ?? defaultStyles.dark,
    light: styles?.light ?? defaultStyles.light, // Back to normal light/dark styles
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    // Always use dark map style for better contrast
    const mapStyle = mapStyles.dark;

    const mapInstance = new MapLibreGL.Map({
      container: containerRef.current,
      style: mapStyle,
      renderWorldCopies: false,
      attributionControl: {
        compact: true,
      },
      ...props,
    });

    const styleDataHandler = () => {
      setIsStyleLoaded(true);
    };
    
    const loadHandler = () => {
      setIsLoaded(true);
      
      // Hide all country and place labels except our custom markers
      setTimeout(() => {
        try {
          const layers = mapInstance.getStyle().layers;
          layers?.forEach((layer) => {
            // Hide all text labels from the base map (countries, cities, places)
            if (layer.type === 'symbol' && layer.layout && 'text-field' in layer.layout) {
              mapInstance.setLayoutProperty(layer.id, 'visibility', 'none');
            }
          });
        } catch (error) {
          console.log('Could not hide labels:', error);
        }
      }, 500);
    };

    mapInstance.on("load", loadHandler);
    mapInstance.on("styledata", styleDataHandler);

    mapRef.current = mapInstance;

    return () => {
      mapInstance.off("load", loadHandler);
      mapInstance.off("styledata", styleDataHandler);
      mapInstance.remove();
      mapRef.current = null;
    };
  }, [isMounted]);

  useEffect(() => {
    if (mapRef.current) {
      setIsStyleLoaded(false);
      // Always use dark style
      mapRef.current.setStyle(
        mapStyles.dark,
        { diff: true }
      );
    }
  }, [resolvedTheme]);

  const isLoading = !isMounted || !isLoaded || !isStyleLoaded;

  return (
    <MapContext.Provider
      value={{
        map: mapRef.current,
        isLoaded: isMounted && isLoaded && isStyleLoaded,
      }}
    >
      <div ref={containerRef} className="relative w-full h-full">
        {isLoading && <DefaultLoader />}
        {isMounted && children}
      </div>
    </MapContext.Provider>
  );
}

type MarkerContextValue = {
  markerRef: React.RefObject<MapLibreGL.Marker | null>;
  markerElementRef: React.RefObject<HTMLDivElement | null>;
  map: MapLibreGL.Map | null;
  isReady: boolean;
};

const MarkerContext = createContext<MarkerContextValue | null>(null);

function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}

type MapMarkerProps = {
  longitude: number;
  latitude: number;
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
} & Omit<MapLibreGL.MarkerOptions, "element">;

function MapMarker({
  longitude,
  latitude,
  children,
  onClick,
  ...markerOptions
}: MapMarkerProps) {
  const { map, isLoaded } = useMap();
  const markerRef = useRef<MapLibreGL.Marker | null>(null);
  const markerElementRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoaded || !map) return;

    const container = document.createElement("div");
    markerElementRef.current = container;

    const marker = new MapLibreGL.Marker({
      ...markerOptions,
      element: container,
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    markerRef.current = marker;

    const handleClick = (e: MouseEvent) => onClick?.(e);
    container.addEventListener("click", handleClick);

    setIsReady(true);

    return () => {
      container.removeEventListener("click", handleClick);
      marker.remove();
      markerRef.current = null;
      markerElementRef.current = null;
      setIsReady(false);
    };
  }, [map, isLoaded]);

  useEffect(() => {
    markerRef.current?.setLngLat([longitude, latitude]);
  }, [longitude, latitude]);

  return (
    <MarkerContext.Provider
      value={{ markerRef, markerElementRef, map, isReady }}
    >
      {children}
    </MarkerContext.Provider>
  );
}

type MarkerContentProps = {
  children?: ReactNode;
  className?: string;
};

function MarkerContent({ children, className }: MarkerContentProps) {
  const { markerElementRef, isReady } = useMarkerContext();

  if (!isReady || !markerElementRef.current) return null;

  return createPortal(
    <div className={cn("relative cursor-pointer", className)}>
      {children || <DefaultMarkerIcon />}
    </div>,
    markerElementRef.current
  );
}

function DefaultMarkerIcon() {
  return (
    <div className="relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
  );
}

type MarkerPopupProps = {
  children: ReactNode;
  className?: string;
};

function MarkerPopup({ children, className }: MarkerPopupProps) {
  const { markerRef, isReady } = useMarkerContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<MapLibreGL.Popup | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isReady || !markerRef.current) return;

    const container = document.createElement("div");
    containerRef.current = container;

    const popup = new MapLibreGL.Popup({
      offset: 16,
      closeButton: false,
    })
      .setMaxWidth("none")
      .setDOMContent(container);

    popupRef.current = popup;
    markerRef.current.setPopup(popup);

    setMounted(true);

    return () => {
      popup.remove();
      popupRef.current = null;
      containerRef.current = null;
      setMounted(false);
    };
  }, [isReady]);

  if (!mounted || !containerRef.current) return null;

  return createPortal(
    <div
      className={cn(
        "relative rounded-md border border-[#d4af37] bg-popover p-3 text-popover-foreground shadow-md",
        className
      )}
    >
      {children}
    </div>,
    containerRef.current
  );
}

// Main Egypt Map Component
interface EgyptMapInteractiveProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function EgyptMapInteractive({
  dots = [],
  lineColor = "#d4af37",
}: EgyptMapInteractiveProps) {
  const { resolvedTheme } = useTheme();
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  
  // Egypt center - no bounds restriction for free movement
  const egyptCenter: [number, number] = [29.5, 26.8];

  return (
    <div className="relative group">
      {/* Liquid Glass Container */}
      <div className="liquid-glass-container">
        {/* Floating light reflection effect */}
        <div className="liquid-light-reflection" />
        
        {/* Map Content */}
        <div className="w-full aspect-[5/2] rounded-[32px] overflow-hidden relative">
          <Map
            center={egyptCenter}
            zoom={5.8}
            minZoom={4}
            maxZoom={12}
            dragRotate={false}
            touchZoomRotate={false}
            attributionControl={false}
          >
            {/* Render markers for all locations */}
            {dots.map((dot, i) => (
              <MapMarker
                key={`marker-${i}`}
                longitude={dot.end.lng}
                latitude={dot.end.lat}
              >
                <MarkerContent>
                  <div className="flex flex-col items-center">
                    <MapPin
                      className="h-6 w-6 drop-shadow-lg"
                      style={{ color: lineColor, fill: lineColor }}
                    />
                    {dot.end.label && (
                      <div 
                        className="mt-1 px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap shadow-sm"
                        style={{ 
                          color: lineColor,
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: `1px solid ${lineColor}`
                        }}
                      >
                        {dot.end.label}
                      </div>
                    )}
                  </div>
                </MarkerContent>
                {dot.end.label && (
                  <MarkerPopup>
                    <div className="min-w-[120px]">
                      <h3
                        className="font-bold text-sm"
                        style={{ color: lineColor }}
                      >
                        {dot.end.label}
                      </h3>
                    </div>
                  </MarkerPopup>
                )}
              </MapMarker>
            ))}

            {/* Cairo headquarters marker */}
            {dots.length > 0 && dots[0].start.label && (
              <MapMarker
                longitude={dots[0].start.lng}
                latitude={dots[0].start.lat}
              >
                <MarkerContent>
                  <div className="flex flex-col items-center">
                    <MapPin
                      className="h-8 w-8 drop-shadow-xl"
                      style={{ color: lineColor, fill: lineColor }}
                    />
                    <div 
                      className="mt-1 px-2 py-1 rounded text-sm font-bold whitespace-nowrap shadow-md"
                      style={{ 
                        color: lineColor,
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        border: `1.5px solid ${lineColor}`
                      }}
                    >
                      {dots[0].start.label}
                    </div>
                  </div>
                </MarkerContent>
                <MarkerPopup>
                  <div className="min-w-[150px]">
                    <h3
                      className="font-bold text-base"
                      style={{ color: lineColor }}
                    >
                      {dots[0].start.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Headquarters
                    </p>
                  </div>
                </MarkerPopup>
              </MapMarker>
            )}
          </Map>
          
          {/* Custom attribution with expandable info */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/95 dark:bg-gray-900/95 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out">
            <button
              onClick={() => setIsInfoExpanded(!isInfoExpanded)}
              className="flex items-center justify-center w-6 h-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer rounded-full"
              aria-label="Toggle map information"
            >
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-[10px]">
                i
              </div>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${
                isInfoExpanded ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'
              }`}
            >
              <span className="text-gray-700 dark:text-gray-300 font-medium text-xs pl-1 pr-3 whitespace-nowrap">
                BonyanMisr Service Locations
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .liquid-glass-container {
          position: relative;
          padding: 2px;
          border-radius: 36px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 8px 40px rgba(0, 0, 0, 0.4),
            0 2px 8px rgba(212, 175, 55, 0.1),
            inset 0 1px 1px rgba(255, 255, 255, 0.15);
          transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
        }

        .liquid-glass-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(212, 175, 55, 0.08) 30%,
            transparent 60%
          );
          border-radius: 36px 36px 0 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .group:hover .liquid-glass-container::before {
          opacity: 1;
        }

        .liquid-light-reflection {
          position: absolute;
          top: -20%;
          left: -10%;
          width: 40%;
          height: 60%;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(212, 175, 55, 0.12) 25%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(30px);
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          animation: shimmer 8s ease-in-out infinite;
          transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .group:hover .liquid-light-reflection {
          opacity: 0.6;
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.6;
            transform: translate(0, 0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(10px, 5px) scale(1.05);
          }
        }

        .group:hover .liquid-glass-container {
          background: rgba(255, 255, 255, 0.12);
          transform: scale(1.01);
          box-shadow: 
            0 12px 50px rgba(0, 0, 0, 0.5),
            0 4px 12px rgba(212, 175, 55, 0.15),
            inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        @supports not (backdrop-filter: blur(24px)) {
          .liquid-glass-container {
            background: rgba(255, 255, 255, 0.15);
          }
        }
      `}</style>
    </div>
  );
}
