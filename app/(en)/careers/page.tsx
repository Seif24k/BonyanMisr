import { HardHat, Palette, PaintBucket, TrendingUp, Shield, Users, Banknote } from 'lucide-react';

export default function Careers() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Build Your Future With Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join Egypt's leading construction and design firm. We are looking for passionate
            individuals to help us shape the skyline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Construction */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="mb-4 text-[#d4af37]">
              <HardHat className="w-16 h-16" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Construction
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Civil engineers, site managers, and safety officers needed for our large-scale
              residential and commercial projects.
            </p>
            <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-gray-900 font-bold transition">
              See Roles
            </button>
          </div>

          {/* Interior Design */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="mb-4 text-[#d4af37]">
              <Palette className="w-16 h-16" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Interior Design
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Creative minds wanted to craft luxury residential and commercial spaces that inspire
              and function beautifully.
            </p>
            <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-gray-900 font-bold transition">
              See Roles
            </button>
          </div>

          {/* Finishing */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="mb-4 text-[#d4af37]">
              <PaintBucket className="w-16 h-16" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Finishing
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Detail-oriented specialists and craftsmen to ensure perfection in every corner and
              surface of our builds.
            </p>
            <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-gray-900 font-bold transition">
              See Roles
            </button>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Join BonyanMisr?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37]">
                <TrendingUp className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                  Professional Growth
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Regular training workshops and career advancement paths.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37]">
                <Shield className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                  Health Insurance
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Comprehensive medical coverage for you and your family.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37]">
                <Users className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                  Collaborative Culture
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Work with Egypt's top talent in a supportive environment.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37]">
                <Banknote className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                  Competitive Salary
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Market-leading compensation packages and bonuses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
