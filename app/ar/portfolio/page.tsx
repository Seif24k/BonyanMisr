'use client';

import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { HorizontalScroll, HorizontalScrollItem } from '@/components/ui/HorizontalScroll';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { MouseFollowLight } from '@/components/ui/MouseFollowLight';
import PremiumProjectsGridAr from '@/components/ui/premium-projects-grid-ar';
import { PortfolioInfiniteSliderAr } from '@/components/ui/portfolio-infinite-slider-ar';
import { PremiumSectionHeader } from '@/components/ui/premium-section-header';

export default function PortfolioAr() {
  const galleryData: GalleryItem[] = [
    {
      common: 'تصميم مطبخ عصري',
      binomial: 'التميز الداخلي',
      photo: {
        url: '/images/projects/carousel-1.jpg',
        text: 'مطبخ بسيط مع تشطيبات حديثة',
        pos: '50% 50%',
        by: 'بنيان مصر'
      }
    },
    {
      common: 'غرفة معيشة فاخرة',
      binomial: 'تصميمات داخلية راقية',
      photo: {
        url: '/images/projects/interior-living.jpg',
        text: 'مساحة معيشة أنيقة بتصميم معاصر',
        pos: '50% 50%',
        by: 'بنيان مصر'
      }
    },
    {
      common: 'غرفة طعام معاصرة',
      binomial: 'الحياة العصرية',
      photo: {
        url: '/images/projects/carousel-2.jpg',
        text: 'منطقة طعام أنيقة مع إضاءة طبيعية',
        pos: '50% 50%',
        by: 'بنيان مصر'
      }
    },
    {
      common: 'جناح غرفة النوم الرئيسية',
      binomial: 'الراحة والأناقة',
      photo: {
        url: '/images/projects/interior-bedroom-1.jpg',
        text: 'غرفة نوم فاخرة مع تشطيبات راقية',
        pos: '50% 50%',
        by: 'بنيان مصر'
      }
    },
    {
      common: 'تصميم داخلي حديث',
      binomial: 'الابتكار في التصميم',
      photo: {
        url: '/images/projects/carousel-3.jpg',
        text: 'تصميم داخلي معاصر',
        pos: '50% 50%',
        by: 'بنيان مصر'
      }
    },
    {
      common: 'غرفة نوم أنيقة',
      binomial: 'الحياة الراقية',
      photo: {
        url: '/images/projects/interior-bedroom-2.jpg',
        text: 'تصميم غرفة نوم متطور',
        pos: '50% 50%',
        by: 'بنيان مصر'
      }
    },
    {
      common: 'تشطيبات راقية',
      binomial: 'حرفية عالية الجودة',
      photo: {
        url: '/images/projects/carousel-4.jpg',
        text: 'تفاصيل تشطيبات فاخرة',
        pos: '50% 50%',
        by: 'بنيان مصر'
      }
    },
    {
      common: 'التميز المعماري',
      binomial: 'التصميم الحديث',
      photo: {
        url: '/images/projects/carousel-5.jpg',
        text: 'تصميم معماري معاصر',
        pos: '50% 50%',
        by: 'بنيان مصر'
      }
    },
    {
      common: 'تصميمات داخلية فاخرة',
      binomial: 'مساحات راقية',
      photo: {
        url: '/images/projects/carousel-6.jpg',
        text: 'مساحات داخلية أنيقة',
        pos: '50% 50%',
        by: 'بنيان مصر'
      }
    }
  ];

  const horizontalScrollData: HorizontalScrollItem[] = [
    {
      id: 1,
      title: 'مجمع سكني حديث',
      subtitle: 'مساحات معيشة فاخرة',
      description: 'تطوير سكني معاصر يتميز بتشطيبات راقية، تصميمات واسعة، ووسائل راحة حديثة في قلب القاهرة الجديدة.',
      image: '/images/projects/01.jpg.jpeg',
      category: 'البناء'
    },
    {
      id: 2,
      title: 'برج مكاتب تنفيذي',
      subtitle: 'التميز التجاري',
      description: 'مبنى مكاتب حديث بتصميم متطور، تقنية المباني الذكية، وإطلالات بانورامية على المدينة.',
      image: '/images/projects/02.jpg.jpeg',
      category: 'البناء'
    },
    {
      id: 3,
      title: 'تصميم داخلي لفيلا فاخرة',
      subtitle: 'تصميم أنيق',
      description: 'تصميم داخلي متطور يجمع بين الجماليات الحديثة والعناصر المصرية التقليدية والمواد الفاخرة.',
      image: '/images/projects/03.jpg.jpeg',
      category: 'التصميم'
    },
    {
      id: 4,
      title: 'تشطيب شقة راقية',
      subtitle: 'تفاصيل فاخرة',
      description: 'أعمال تشطيب رائعة تتميز بأرضيات رخامية، خزائن مخصصة، وتركيبات إضاءة مصممة.',
      image: '/images/projects/04.jpg.jpeg',
      category: 'خط النهاية'
    },
    {
      id: 5,
      title: 'مجمع تجاري',
      subtitle: 'التجزئة والترفيه',
      description: 'مجمع تجاري متعدد المستويات بهندسة معمارية حديثة، مساحات تجزئة واسعة، ومرافق ترفيهية.',
      image: '/images/projects/05.jpg.jpeg',
      category: 'البناء'
    },
    {
      id: 6,
      title: 'غرفة معيشة معاصرة',
      subtitle: 'الراحة الحديثة',
      description: 'تصميم مساحة معيشة أنيقة بتخطيط مفتوح، إضاءة طبيعية، واختيار أثاث معاصر.',
      image: '/images/projects/06.jpg.jpeg',
      category: 'التصميم'
    },
    {
      id: 7,
      title: 'برج سكني',
      subtitle: 'الحياة الحضرية',
      description: 'مبنى سكني شاهق بواجهة حديثة، أنظمة موفرة للطاقة، ووسائل راحة فاخرة.',
      image: '/images/projects/07.jpg.jpeg',
      category: 'البناء'
    },
    {
      id: 8,
      title: 'جناح غرفة النوم الرئيسية',
      subtitle: 'الفخامة والراحة',
      description: 'تصميم غرفة نوم أنيقة يتميز بمنسوجات فاخرة، أثاث مخصص، وتصميم إضاءة متطور.',
      image: '/images/projects/08.jpg.jpeg',
      category: 'التصميم'
    },
    {
      id: 9,
      title: 'المقر الرئيسي للشركات',
      subtitle: 'التميز في الأعمال',
      description: 'مبنى شركات حديث بردهة مذهلة، مساحات مكتبية مرنة، وبنية تحتية متقدمة.',
      image: '/images/projects/09.jpg.jpeg',
      category: 'البناء'
    },
    {
      id: 10,
      title: 'تشطيب بنتهاوس',
      subtitle: 'الفخامة المطلقة',
      description: 'أعمال تشطيب راقية لبنتهاوس حصري يتميز بمواد مستوردة، تفاصيل مخصصة، وتكامل المنزل الذكي.',
      image: '/images/projects/10.jpg.jpeg',
      category: 'خط النهاية'
    }
  ];



  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden" dir="rtl">
      {/* Blueprint Background */}
      <BlueprintBackground />

      {/* Animated Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute top-1/3 left-32 w-80 h-80 bg-purple-400/15 dark:bg-purple-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-400/15 dark:bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1500ms' }}></div>
      </div>

      {/* Mouse Follow Light */}
      <MouseFollowLight />

      {/* Circular Gallery Section */}
      <div className="relative z-10 h-[82svh] min-h-[520px] w-full pt-14 md:h-[120vh] md:min-h-0 md:pt-20">
        <div className="sticky top-0 flex h-[82svh] min-h-[520px] w-full flex-col items-center justify-center overflow-hidden md:h-screen md:min-h-0">
          <div className="absolute top-10 z-10 w-full px-4 md:top-16">
            <PremiumSectionHeader as="h1" title="تحفنا الفنية" />
          </div>
          <div className="mt-16 h-full w-full md:mt-20">
            <CircularGallery items={galleryData} radius={650} autoRotateSpeed={0.015} />
          </div>
        </div>
      </div>

      {/* Infinite Slider Section */}
      <div className="relative z-10">
        <PortfolioInfiniteSliderAr />
      </div>

      {/* Horizontal Scroll Section - Featured Projects */}
      <div className="relative z-10">
        <HorizontalScroll
          items={horizontalScrollData}
          title="المشاريع المميزة"
          subtitle="مرر للإيقاف • اسحب للاستكشاف"
        />
      </div>

      {/* Premium Projects Grid */}
      <div className="relative z-10">
        <PremiumProjectsGridAr />
      </div>
    </div>
  );
}
