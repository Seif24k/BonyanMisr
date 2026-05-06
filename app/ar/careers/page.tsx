import { HardHat, Palette, PaintBucket, TrendingUp, Shield, Users, Banknote } from 'lucide-react';

export default function CareersAr() {
  return (
    <div className="min-h-screen py-20 px-4 bg-white dark:bg-gray-900" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ابنِ مستقبلك معنا
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            انضم إلى شركة البناء والتصميم الرائدة في مصر. نبحث عن أفراد متحمسين
            لمساعدتنا في تشكيل أفق المدينة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Construction */}
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="mb-4 text-[#d4af37]">
              <HardHat className="w-16 h-16" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              البناء
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              مهندسون مدنيون ومديرو مواقع ومسؤولو سلامة مطلوبون لمشاريعنا السكنية
              والتجارية واسعة النطاق.
            </p>
            <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-gray-900 font-bold transition">
              عرض الوظائف
            </button>
          </div>

          {/* Interior Design */}
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="mb-4 text-[#d4af37]">
              <Palette className="w-16 h-16" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              التصميم الداخلي
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              عقول إبداعية مطلوبة لصياغة مساحات سكنية وتجارية فاخرة تلهم
              وتعمل بشكل جميل.
            </p>
            <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-gray-900 font-bold transition">
              عرض الوظائف
            </button>
          </div>

          {/* Finishing */}
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="mb-4 text-[#d4af37]">
              <PaintBucket className="w-16 h-16" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              التشطيبات
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              متخصصون وحرفيون يهتمون بالتفاصيل لضمان الكمال في كل زاوية
              وسطح من مبانينا.
            </p>
            <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-gray-900 font-bold transition">
              عرض الوظائف
            </button>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            لماذا تنضم إلى بنيان مصر؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37]">
                <TrendingUp className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                  النمو المهني
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  ورش عمل تدريبية منتظمة ومسارات للتقدم الوظيفي.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37]">
                <Shield className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                  التأمين الصحي
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  تغطية طبية شاملة لك ولعائلتك.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37]">
                <Users className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                  ثقافة تعاونية
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  اعمل مع أفضل المواهب في مصر في بيئة داعمة.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37]">
                <Banknote className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                  راتب تنافسي
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  حزم تعويضات رائدة في السوق ومكافآت.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
