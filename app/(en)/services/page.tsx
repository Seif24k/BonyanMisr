import { EgyptMap } from '@/components/ui/egypt-map';
import { FlipWords } from '@/components/ui/flip-words';
import Image from 'next/image';
import TextHoverEffect from '@/components/ui/shimmer-bg-text';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { MouseFollowLight } from '@/components/ui/MouseFollowLight';

export default function Services() {
  const words = ["Construction", "Design", "Finishing", "Renovation"];
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Blueprint Background */}
      <BlueprintBackground />
      
      {/* Animated Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute top-40 right-32 w-64 h-64 bg-cyan-400/15 dark:bg-cyan-500/25 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        
        {/* Middle orbs */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-indigo-400/15 dark:bg-indigo-600/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1500ms' }}></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-400/20 dark:bg-purple-500/25 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '2000ms' }}></div>
        
        {/* Bottom orbs */}
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/15 dark:bg-purple-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute bottom-32 left-40 w-80 h-80 bg-blue-400/15 dark:bg-blue-500/20 rounded-full blur-[135px] animate-pulse" style={{ animationDelay: '2500ms' }}></div>
      </div>
      
      {/* Mouse Follow Light */}
      <MouseFollowLight />
      
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
        {/* Service Coverage Map */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-2xl">
              Expert <FlipWords words={words} duration={3000} className="text-primary" /> Services
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto drop-shadow-xl">
              BonyanMisr proudly serves major cities across Egypt, delivering excellence in construction,
              interior design, and finishing services.
            </p>
          </div>
          <EgyptMap
            dots={[
              {
                start: { lat: 30.0444, lng: 31.2357 }, // Cairo (Headquarters)
                end: { lat: 31.2001, lng: 29.9187, label: "Alexandria" },   // Alexandria
              },
              {
                start: { lat: 30.0444, lng: 31.2357 }, // Cairo
                end: { lat: 27.2579, lng: 33.0, label: "Hurghada" },      // Hurghada (moved west to coast)
              },
              {
                start: { lat: 30.0444, lng: 31.2357 }, // Cairo
                end: { lat: 31.0409, lng: 31.3785, label: "New Capital" },   // New Administrative Capital
              },
              {
                start: { lat: 30.0444, lng: 31.2357, label: "Cairo" }, // Cairo
                end: { lat: 30.0131, lng: 31.2089, label: "New Cairo" },   // New Cairo
              },
              {
                start: { lat: 30.0444, lng: 31.2357 }, // Cairo
                end: { lat: 25.6872, lng: 32.6396, label: "Luxor" },   // Luxor
              },
            ]}
            lineColor="#d4af37"
          />
        </div>

        <div className="space-y-20">
          {/* Construction Service */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <TextHoverEffect
                  text="Construction & Contracting"
                  className="text-3xl font-bold leading-tight tracking-tight"
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 drop-shadow-lg">
                From foundational structures to exquisite finishing touches, BonyanMisr delivers
                comprehensive solutions in Construction, Interior Design, and Finishing. We build
                trust through quality.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Residential & Commercial Buildings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Structural Engineering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Project Management</span>
                </li>
              </ul>
            </div>
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
              <Image
                src="/construction-site.jpg"
                alt="Construction site with heavy machinery"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Interior Design Service */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
              <Image
                src="/interior-design.jpg"
                alt="Modern interior design"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-4">
                <TextHoverEffect
                  text="Interior Design"
                  className="text-3xl font-bold"
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 drop-shadow-lg">
                Creating functional and aesthetically pleasing interior spaces that reflect your
                personal style and enhance your daily living experience.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Space Planning & Layout</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">3D Visualization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Custom Furniture Design</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Finishing Service */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <TextHoverEffect
                  text="High-End Finishing"
                  className="text-3xl font-bold"
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 drop-shadow-lg">
                Attention to detail in every corner. Our finishing services ensure perfection in
                flooring, painting, plastering, and all final touches.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Premium Flooring & Tiling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Professional Painting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Custom Joinery & Carpentry</span>
                </li>
              </ul>
            </div>
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
              <Image
                src="/finishing.jpg"
                alt="High-end finishing work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
