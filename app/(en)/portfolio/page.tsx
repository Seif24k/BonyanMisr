'use client';

import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { HorizontalScroll, HorizontalScrollItem } from '@/components/ui/HorizontalScroll';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { MouseFollowLight } from '@/components/ui/MouseFollowLight';
import PremiumProjectsGrid from '@/components/ui/premium-projects-grid';
import { PortfolioInfiniteSlider } from '@/components/ui/portfolio-infinite-slider';
import { PremiumSectionHeader } from '@/components/ui/premium-section-header';

export default function Portfolio() {
  const galleryData: GalleryItem[] = [
    {
      common: 'Modern Kitchen Design',
      binomial: 'Interior Excellence',
      photo: {
        url: '/images/projects/carousel-1.jpg',
        text: 'Minimalist kitchen with modern finishes',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Luxury Living Room',
      binomial: 'Premium Interiors',
      photo: {
        url: '/images/projects/interior-living.jpg',
        text: 'Elegant living space with contemporary design',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Contemporary Dining',
      binomial: 'Modern Living',
      photo: {
        url: '/images/projects/carousel-2.jpg',
        text: 'Stylish dining area with natural light',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Master Bedroom Suite',
      binomial: 'Comfort & Style',
      photo: {
        url: '/images/projects/interior-bedroom-1.jpg',
        text: 'Luxurious bedroom with premium finishes',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Modern Interior',
      binomial: 'Design Innovation',
      photo: {
        url: '/images/projects/carousel-3.jpg',
        text: 'Contemporary interior design',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Elegant Bedroom',
      binomial: 'Refined Living',
      photo: {
        url: '/images/projects/interior-bedroom-2.jpg',
        text: 'Sophisticated bedroom design',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Premium Finishing',
      binomial: 'Quality Craftsmanship',
      photo: {
        url: '/images/projects/carousel-4.jpg',
        text: 'High-end finishing details',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Architectural Excellence',
      binomial: 'Modern Design',
      photo: {
        url: '/images/projects/carousel-5.jpg',
        text: 'Contemporary architectural design',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Luxury Interiors',
      binomial: 'Premium Spaces',
      photo: {
        url: '/images/projects/carousel-6.jpg',
        text: 'Elegant interior spaces',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    }
  ];

  const horizontalScrollData: HorizontalScrollItem[] = [
    {
      id: 1,
      title: 'Modern Residential Complex',
      subtitle: 'Luxury Living Spaces',
      description: 'Contemporary residential development featuring premium finishes, spacious layouts, and modern amenities in the heart of New Cairo.',
      image: '/images/projects/01.jpg.jpeg',
      category: 'Build'
    },
    {
      id: 2,
      title: 'Executive Office Tower',
      subtitle: 'Commercial Excellence',
      description: 'State-of-the-art office building with cutting-edge design, smart building technology, and panoramic city views.',
      image: '/images/projects/02.jpg.jpeg',
      category: 'Build'
    },
    {
      id: 3,
      title: 'Luxury Villa Interior',
      subtitle: 'Elegant Design',
      description: 'Sophisticated interior design combining modern aesthetics with traditional Egyptian elements and premium materials.',
      image: '/images/projects/03.jpg.jpeg',
      category: 'Design'
    },
    {
      id: 4,
      title: 'Premium Apartment Finishing',
      subtitle: 'High-End Details',
      description: 'Exquisite finishing work featuring marble flooring, custom cabinetry, and designer lighting fixtures.',
      image: '/images/projects/04.jpg.jpeg',
      category: 'Finish Line'
    },
    {
      id: 5,
      title: 'Commercial Plaza',
      subtitle: 'Retail & Entertainment',
      description: 'Multi-level commercial complex with modern architecture, spacious retail areas, and entertainment facilities.',
      image: '/images/projects/05.jpg.jpeg',
      category: 'Build'
    },
    {
      id: 6,
      title: 'Contemporary Living Room',
      subtitle: 'Modern Comfort',
      description: 'Stylish living space design with open-plan layout, natural lighting, and contemporary furniture selection.',
      image: '/images/projects/06.jpg.jpeg',
      category: 'Design'
    },
    {
      id: 7,
      title: 'Residential Tower',
      subtitle: 'Urban Living',
      description: 'High-rise residential building with modern facade, energy-efficient systems, and luxury amenities.',
      image: '/images/projects/07.jpg.jpeg',
      category: 'Build'
    },
    {
      id: 8,
      title: 'Master Bedroom Suite',
      subtitle: 'Luxury & Comfort',
      description: 'Elegant bedroom design featuring premium textiles, custom furniture, and sophisticated lighting design.',
      image: '/images/projects/08.jpg.jpeg',
      category: 'Design'
    },
    {
      id: 9,
      title: 'Corporate Headquarters',
      subtitle: 'Business Excellence',
      description: 'Modern corporate building with impressive lobby, flexible office spaces, and advanced infrastructure.',
      image: '/images/projects/09.jpg.jpeg',
      category: 'Build'
    },
    {
      id: 10,
      title: 'Penthouse Finishing',
      subtitle: 'Ultimate Luxury',
      description: 'Premium finishing work for exclusive penthouse featuring imported materials, custom details, and smart home integration.',
      image: '/images/projects/10.jpg.jpeg',
      category: 'Finish Line'
    }
  ];



  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Blueprint Background */}
      <BlueprintBackground />

      {/* Animated Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute top-1/3 right-32 w-80 h-80 bg-purple-400/15 dark:bg-purple-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan-400/15 dark:bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1500ms' }}></div>
      </div>

      {/* Mouse Follow Light */}
      <MouseFollowLight />

      {/* Circular Gallery Section */}
      <div className="w-full relative z-10 pt-20 h-[80svh] md:h-[120vh]">
        <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-16 z-10 w-full px-4">
            <PremiumSectionHeader as="h1" title="Our Masterpieces" />
          </div>
          <div className="w-full h-full mt-20">
            <CircularGallery items={galleryData} radius={650} autoRotateSpeed={0.015} />
          </div>
        </div>
      </div>

      {/* Infinite Slider Section */}
      <div className="relative z-10">
        <PortfolioInfiniteSlider />
      </div>

      {/* Horizontal Scroll Section - Featured Projects */}
      <div className="relative z-10">
        <HorizontalScroll items={horizontalScrollData} />
      </div>

      {/* Premium Projects Grid */}
      <div className="relative z-10">
        <PremiumProjectsGrid />
      </div>
    </div>
  );
}
