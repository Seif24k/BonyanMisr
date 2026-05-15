"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { cn } from "@/lib/utils";

interface FloatingPreviewImage {
  src: string;
  alt?: string;
}

interface ParallaxFloatingPreviewProps {
  images: FloatingPreviewImage[];
  title: string;
  className?: string;
}

const fallbackImages: FloatingPreviewImage[] = [
  { src: "/images/projects/carousel-1.jpg", alt: "Modern kitchen design" },
  { src: "/images/projects/interior-living.jpg", alt: "Luxury living room" },
  { src: "/images/projects/carousel-2.jpg", alt: "Contemporary dining room" },
  { src: "/images/projects/interior-bedroom-1.jpg", alt: "Master bedroom suite" },
  { src: "/images/projects/carousel-4.jpg", alt: "Premium finishing detail" },
  { src: "/images/projects/carousel-5.jpg", alt: "Architectural project" },
  { src: "/images/projects/carousel-6.jpg", alt: "Luxury interior" },
  { src: "/images/projects/08.jpg.jpeg", alt: "Completed BonyanMisr project" },
];

const floatingLayout = [
  { depth: 0.6, className: "left-[6%] top-[7%]", size: "h-28 w-28 md:h-40 md:w-40" },
  { depth: 1, className: "left-[29%] top-[6%]", size: "h-32 w-32 md:h-48 md:w-48" },
  { depth: 2.2, className: "left-[54%] top-[2%]", size: "h-56 w-36 md:h-72 md:w-52" },
  { depth: 1.2, className: "left-[80%] top-[10%]", size: "h-32 w-32 md:h-48 md:w-48" },
  { depth: 1, className: "left-[2%] top-[35%]", size: "h-36 w-36 md:h-52 md:w-52" },
  { depth: 2.4, className: "left-[74%] top-[46%]", size: "h-48 w-36 md:h-64 md:w-48" },
  { depth: 4, className: "left-[12%] top-[58%]", size: "h-56 w-40 md:h-80 md:w-64" },
  { depth: 1.2, className: "left-[48%] top-[64%]", size: "h-32 w-32 md:h-48 md:w-48" },
  { depth: 2.8, className: "left-[84%] top-[72%]", size: "h-36 w-28 md:h-56 md:w-44" },
  { depth: 1.6, className: "left-[4%] top-[84%]", size: "h-36 w-48 md:h-52 md:w-72" },
  { depth: 3.2, className: "left-[34%] top-[88%]", size: "h-44 w-32 md:h-64 md:w-48" },
  { depth: 1, className: "left-[64%] top-[90%]", size: "h-32 w-32 md:h-48 md:w-48" },
];

const getPreviewImages = (images: FloatingPreviewImage[]) => {
  const sourceImages = images.length > 0 ? images : fallbackImages;

  return floatingLayout.map((_, index) => sourceImages[index % sourceImages.length]);
};

export function ParallaxFloatingPreview({
  images,
  title,
  className,
}: ParallaxFloatingPreviewProps) {
  const [scope, animate] = useAnimate();
  const previewImages = getPreviewImages(images);

  useEffect(() => {
    animate(
      "[data-floating-card]",
      { opacity: [0, 1], scale: [0.94, 1] },
      { duration: 0.6, delay: stagger(0.12), ease: "easeOut" }
    );
  }, [animate]);

  return (
    <section
      ref={scope}
      className={cn(
        "relative flex min-h-[1120px] items-center justify-center overflow-hidden bg-[#05070c] py-40 md:h-[150vh] md:min-h-[1280px]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(212,175,55,0.2),transparent_34%),radial-gradient(circle_at_50%_86%,rgba(10,25,47,0.85),transparent_32%),linear-gradient(135deg,rgba(10,25,47,0.94),rgba(5,7,12,1))]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 to-transparent" />

      <motion.div
        className="relative z-20 flex max-w-3xl flex-col items-center space-y-5 px-6 text-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        <span className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#d4af37]">
          Final look
        </span>
        <h2 className="text-5xl font-bold text-white md:text-7xl">
          {title}
        </h2>
        <p className="max-w-xl text-base leading-7 text-gray-300 md:text-lg">
          Move your cursor to explore the project details in a soft floating parallax finish.
        </p>
      </motion.div>

      <Floating sensitivity={-0.85} easingFactor={0.035} className="overflow-hidden">
        {previewImages.map((image, index) => {
          const layout = floatingLayout[index];

          return (
            <FloatingElement
              key={`${image.src}-${index}`}
              depth={layout.depth}
              className={layout.className}
            >
              <motion.div
                data-floating-card
                aria-label={image.alt || `${title} detail ${index + 1}`}
                className={cn(
                  "cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center opacity-0 shadow-2xl shadow-black/40 ring-1 ring-[#d4af37]/10 transition-transform duration-200 hover:scale-105",
                  layout.size
                )}
                role="img"
                style={{ backgroundImage: `url(${image.src})` }}
              />
            </FloatingElement>
          );
        })}
      </Floating>
    </section>
  );
}
