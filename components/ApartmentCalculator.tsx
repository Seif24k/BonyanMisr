'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApartmentCalculatorProps {
    locale: 'en' | 'ar';
}

type FinishingLevel = 'economic' | 'standard' | 'luxury';

interface PriceRange {
    min: number;
    max: number;
}

const priceRanges: Record<FinishingLevel, PriceRange> = {
    economic: { min: 800, max: 1200 },
    standard: { min: 1500, max: 2500 },
    luxury: { min: 3000, max: 5000 },
};

const content = {
    en: {
        heading: 'Calculate Your Apartment Finishing Cost',
        areaLabel: 'Apartment Area (m²)',
        areaPlaceholder: 'Enter area in square meters',
        levelLabel: 'Finishing Level',
        levels: {
            economic: { title: 'Economic', subtitle: 'Budget-Friendly Finishing' },
            standard: { title: 'Standard', subtitle: 'Premium Finishing' },
            luxury: { title: 'Luxury', subtitle: 'Ultra-Luxury Finishing' },
        },
        calculateButton: 'Calculate Estimate',
        resultHeading: 'Estimated Cost Range',
        currency: 'EGP',
        disclaimer:
            'This is an estimated cost range and not a final quotation. Actual costs may vary based on materials, design complexity, and project scope. Contact us for a detailed quote.',
    },
    ar: {
        heading: 'احسب تكلفة تشطيب شقتك',
        areaLabel: 'مساحة الشقة (م²)',
        areaPlaceholder: 'أدخل المساحة بالمتر المربع',
        levelLabel: 'مستوى التشطيب',
        levels: {
            economic: { title: 'اقتصادي', subtitle: 'تشطيب اقتصادي' },
            standard: { title: 'متوسط', subtitle: 'تشطيب متوسط' },
            luxury: { title: 'فاخر', subtitle: 'تشطيب فاخر' },
        },
        calculateButton: 'احسب التكلفة',
        resultHeading: 'التكلفة التقديرية',
        currency: 'جنيه مصري',
        disclaimer:
            'هذا التقدير تقريبي وليس عرض سعر نهائي. قد تختلف التكاليف الفعلية بناءً على المواد والتصميم ونطاق المشروع. اتصل بنا للحصول على عرض سعر مفصل.',
    },
};

function formatNumber(num: number, locale: string): string {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US').format(num);
}

export default function ApartmentCalculator({ locale }: ApartmentCalculatorProps) {
    const [area, setArea] = useState<string>('');
    const [level, setLevel] = useState<FinishingLevel | null>(null);
    const [result, setResult] = useState<PriceRange | null>(null);
    const [showResult, setShowResult] = useState(false);

    const t = content[locale];
    const isRTL = locale === 'ar';

    const handleCalculate = () => {
        const areaNum = parseFloat(area);
        if (isNaN(areaNum) || areaNum <= 0 || !level) return;

        const range = priceRanges[level];
        const calculated = {
            min: areaNum * range.min,
            max: areaNum * range.max,
        };

        setResult(calculated);
        setShowResult(true);
    };

    const isValid = area && parseFloat(area) > 0 && level;

    return (
        <div className={`w-full max-w-4xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-800"
            >
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    {t.heading}
                </h2>

                {/* Area Input */}
                <div className="mb-8">
                    <label
                        htmlFor="area-input"
                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                    >
                        {t.areaLabel}
                    </label>
                    <input
                        id="area-input"
                        type="number"
                        min="0"
                        step="0.1"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder={t.areaPlaceholder}
                        className="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
                    />
                </div>

                {/* Finishing Level Selector */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        {t.levelLabel}
                    </label>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isRTL ? 'md:gap-x-reverse' : ''}`}>
                        {(['economic', 'standard', 'luxury'] as FinishingLevel[]).map((lvl) => (
                            <motion.button
                                key={lvl}
                                onClick={() => setLevel(lvl)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-6 rounded-xl border-2 transition-all duration-300 ${level === lvl
                                        ? 'border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50 hover:shadow-md'
                                    }`}
                            >
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                        {t.levels[lvl].title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {t.levels[lvl].subtitle}
                                    </p>
                                    <p className="text-xs text-primary font-semibold mt-2">
                                        {formatNumber(priceRanges[lvl].min, locale)} - {formatNumber(priceRanges[lvl].max, locale)} {t.currency}/m²
                                    </p>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Calculate Button */}
                <motion.button
                    onClick={handleCalculate}
                    disabled={!isValid}
                    whileHover={isValid ? { scale: 1.02 } : {}}
                    whileTap={isValid ? { scale: 0.98 } : {}}
                    className={`w-full py-4 px-8 rounded-lg font-bold text-lg text-white transition-all duration-300 ${isValid
                            ? 'bg-gradient-to-r from-primary to-yellow-600 hover:from-yellow-600 hover:to-primary shadow-lg hover:shadow-xl'
                            : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50'
                        }`}
                >
                    {t.calculateButton}
                </motion.button>

                {/* Result Display */}
                <AnimatePresence>
                    {showResult && result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="mt-8 p-6 rounded-xl bg-gradient-to-br from-navy-deep to-navy-light border-t-2 border-primary shadow-xl"
                        >
                            <h3 className="text-sm font-semibold text-gray-300 mb-2 text-center">
                                {t.resultHeading}
                            </h3>
                            <div className="text-center">
                                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                                    {formatNumber(result.min, locale)} - {formatNumber(result.max, locale)}
                                </p>
                                <p className="text-lg text-gray-400">{t.currency}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Disclaimer */}
                {showResult && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed"
                    >
                        {t.disclaimer}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}
