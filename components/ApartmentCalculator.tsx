'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LeadCaptureModal, LeadData } from './LeadCaptureModal';

interface ApartmentCalculatorProps {
    locale: 'en' | 'ar';
}

type FinishingLevel = 'economic' | 'standard' | 'luxury';
type PropertyType = 'residential' | 'commercial';

interface PriceRange {
    min: number;
    max: number;
}

// Residential pricing
const residentialPriceRanges: Record<FinishingLevel, PriceRange> = {
    economic: { min: 4500, max: 5500 },
    standard: { min: 8500, max: 10000 },
    luxury: { min: 12000, max: 13500 },
};

// Commercial pricing (add 500 EGP to each tier)
const commercialPriceRanges: Record<FinishingLevel, PriceRange> = {
    economic: { min: 5000, max: 6000 },
    standard: { min: 9000, max: 10500 },
    luxury: { min: 12500, max: 14000 },
};

const content = {
    en: {
        heading: 'Calculate Your Unit Finishing Cost',
        areaLabel: 'Unit Area (m²)',
        areaPlaceholder: 'Enter area in square meters',
        propertyTypeLabel: 'Property Type',
        propertyTypes: {
            residential: 'Residential',
            commercial: 'Commercial (+500 EGP/m²)',
        },
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
        heading: 'احسب تكلفة تشطيب وحدتك',
        areaLabel: 'مساحة الوحدة (م²)',
        areaPlaceholder: 'أدخل المساحة بالمتر المربع',
        propertyTypeLabel: 'نوع العقار',
        propertyTypes: {
            residential: 'سكني',
            commercial: 'تجاري (+٥٠٠ جنيه/م²)',
        },
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

// ============================================================================
// localStorage Utility Functions
// ============================================================================

const STORAGE_KEY = 'leadCaptureSubmitted';
const STORAGE_TIMESTAMP_KEY = 'leadCaptureTimestamp';

function checkSubmissionStatus(): boolean {
    try {
        const submitted = localStorage.getItem(STORAGE_KEY);
        return submitted === 'true';
    } catch (error) {
        console.error('localStorage unavailable:', error);
        return false;
    }
}

function setSubmissionStatus(submitted: boolean): void {
    try {
        localStorage.setItem(STORAGE_KEY, submitted.toString());
        localStorage.setItem(STORAGE_TIMESTAMP_KEY, new Date().toISOString());
    } catch (error) {
        console.error('localStorage write error:', error);
    }
}

// ============================================================================
// Animation Variants for Result Blur
// ============================================================================

const resultVariants = {
    blurred: { 
        filter: 'blur(8px)', 
        opacity: 0.3,
        transition: { duration: 0.3 }
    },
    clear: { 
        filter: 'blur(0px)', 
        opacity: 1,
        transition: { duration: 0.3 }
    }
};

export default function ApartmentCalculator({ locale }: ApartmentCalculatorProps) {
    const [area, setArea] = useState<string>('');
    const [propertyType, setPropertyType] = useState<PropertyType>('residential');
    const [level, setLevel] = useState<FinishingLevel | null>(null);
    const [result, setResult] = useState<PriceRange | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const t = content[locale];
    const isRTL = locale === 'ar';

    // Check submission status on mount
    useEffect(() => {
        const submitted = checkSubmissionStatus();
        setHasSubmitted(submitted);
    }, []);

    const handleCalculate = () => {
        const areaNum = parseFloat(area);
        if (isNaN(areaNum) || areaNum <= 0 || !level) return;

        const priceRanges = propertyType === 'residential' ? residentialPriceRanges : commercialPriceRanges;
        const range = priceRanges[level];
        const calculated = {
            min: areaNum * range.min,
            max: areaNum * range.max,
        };

        setResult(calculated);

        // Check if user has already submitted
        if (hasSubmitted) {
            // Show result immediately
            setShowResult(true);
        } else {
            // Show modal first, render result in background (blurred)
            setShowResult(true);
            setShowModal(true);
        }
    };

    const handleLeadSubmit = async (data: LeadData) => {
        try {
            // Send lead data to API
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit lead');
            }

            const result = await response.json();
            console.log('Lead saved successfully:', result);

            // Update submission status
            setHasSubmitted(true);
            setSubmissionStatus(true);

            // Close modal (result is already visible, just remove blur)
            setShowModal(false);
        } catch (error) {
            console.error('Error submitting lead:', error);
            // Re-throw error so modal can handle it
            throw error;
        }
    };

    const handleModalClose = () => {
        // Currently unused, for future enhancement
        setShowModal(false);
    };

    const isValid = area && parseFloat(area) > 0 && level;

    // Get current price ranges based on property type
    const currentPriceRanges = propertyType === 'residential' ? residentialPriceRanges : commercialPriceRanges;

    return (
        <div className={`w-full max-w-4xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="relative group">
                {/* Liquid Glass Container */}
                <div className="liquid-glass-calculator">
                    {/* Floating light reflection effect */}
                    <div className="liquid-light-reflection-calc" />
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-[32px] p-8 md:p-12 relative z-10"
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

                        {/* Property Type Selector */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                {t.propertyTypeLabel}
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                {(['residential', 'commercial'] as PropertyType[]).map((type) => (
                                    <motion.button
                                        key={type}
                                        onClick={() => setPropertyType(type)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                            propertyType === type
                                                ? 'border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20'
                                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50 hover:shadow-md'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                {t.propertyTypes[type]}
                                            </h3>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
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
                                                {formatNumber(currentPriceRanges[lvl].min, locale)} - {formatNumber(currentPriceRanges[lvl].max, locale)} {t.currency}/m²
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
                                    animate={showModal ? 'blurred' : 'clear'}
                                    variants={resultVariants}
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
                        {showResult && !showModal && (
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

                {/* Lead Capture Modal */}
                <LeadCaptureModal
                    isOpen={showModal}
                    onClose={handleModalClose}
                    onSubmit={handleLeadSubmit}
                    locale={locale}
                    calculationDetails={
                        result && level
                            ? {
                                  area: parseFloat(area),
                                  propertyType,
                                  finishingLevel: level,
                                  estimatedCost: result,
                              }
                            : undefined
                    }
                />

                <style jsx>{`
                    .liquid-glass-calculator {
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

                    .liquid-glass-calculator::before {
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

                    .liquid-light-reflection-calc {
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

                    .group:hover .liquid-glass-calculator {
                        background: rgba(255, 255, 255, 0.12);
                        transform: scale(1.01);
                        box-shadow: 
                            0 12px 50px rgba(0, 0, 0, 0.5),
                            0 4px 12px rgba(212, 175, 55, 0.15),
                            inset 0 1px 1px rgba(255, 255, 255, 0.2);
                    }

                    .group:hover .liquid-glass-calculator::before {
                        opacity: 1;
                    }

                    .group:hover .liquid-light-reflection-calc {
                        opacity: 0.6;
                    }

                    @supports not (backdrop-filter: blur(24px)) {
                        .liquid-glass-calculator {
                            background: rgba(255, 255, 255, 0.15);
                        }
                    }
                `}</style>
            </div>
        </div>
    );
}
