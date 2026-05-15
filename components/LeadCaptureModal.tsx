'use client';

import { useState, useEffect, FormEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, Check, Loader2 } from 'lucide-react';

// ============================================================================
// TypeScript Interfaces and Types
// ============================================================================

export interface LeadData {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  timestamp: string;
  locale: 'en' | 'ar';
  calculationDetails?: {
    area: number;
    propertyType: 'residential' | 'commercial';
    finishingLevel: 'economic' | 'standard' | 'luxury';
    estimatedCost: {
      min: number;
      max: number;
    };
  };
}

export interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeadData) => void | Promise<void>;
  locale: 'en' | 'ar';
  calculationDetails?: LeadData['calculationDetails'];
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  general?: string;
}

// ============================================================================
// Validation Rules
// ============================================================================

const validationRules = {
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\u0600-\u06FF\s'-]+$/, // Allows Arabic and English names
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    pattern: /^[\d\s\-\(\)\+]+$/,
    minLength: 10,
    maxLength: 20,
  },
  address: {
    required: false,
    maxLength: 200,
  },
};

// ============================================================================
// Content (Bilingual)
// ============================================================================

const content = {
  en: {
    heading: "Get Your Detailed Estimate",
    subtitle: "Enter your details to view your full cost breakdown",
    privacy: "Your information is secure and will never be shared",
    fields: {
      fullName: { label: "Full Name", placeholder: "Enter your full name" },
      email: { label: "Email Address", placeholder: "your@email.com" },
      phone: { label: "Phone Number", placeholder: "+20 123 456 7890" },
      address: { label: "Address (Optional)", placeholder: "Your address" },
    },
    submit: "View My Estimate",
    submitting: "Processing...",
    errors: {
      fullNameRequired: "Please enter your full name",
      fullNameMinLength: "Name must be at least 2 characters",
      fullNameInvalid: "Name contains invalid characters",
      emailRequired: "Please enter your email address",
      emailInvalid: "Please enter a valid email address",
      phoneRequired: "Please enter your phone number",
      phoneMinLength: "Phone number must be at least 10 digits",
      phoneInvalid: "Phone number contains invalid characters",
      addressMaxLength: "Address is too long (maximum 200 characters)",
      general: "Something went wrong. Please try again.",
    },
  },
  ar: {
    heading: "احصل على تقديرك التفصيلي",
    subtitle: "أدخل بياناتك لعرض التكلفة الكاملة",
    privacy: "معلوماتك آمنة ولن تتم مشاركتها أبداً",
    fields: {
      fullName: { label: "الاسم الكامل", placeholder: "أدخل اسمك الكامل" },
      email: { label: "البريد الإلكتروني", placeholder: "your@email.com" },
      phone: { label: "رقم الهاتف", placeholder: "٠١٢٣٤٥٦٧٨٩٠" },
      address: { label: "العنوان (اختياري)", placeholder: "عنوانك" },
    },
    submit: "عرض التقدير",
    submitting: "جاري المعالجة...",
    errors: {
      fullNameRequired: "الرجاء إدخال اسمك الكامل",
      fullNameMinLength: "يجب أن يكون الاسم حرفين على الأقل",
      fullNameInvalid: "الاسم يحتوي على أحرف غير صالحة",
      emailRequired: "الرجاء إدخال بريدك الإلكتروني",
      emailInvalid: "الرجاء إدخال بريد إلكتروني صالح",
      phoneRequired: "الرجاء إدخال رقم هاتفك",
      phoneMinLength: "يجب أن يكون رقم الهاتف 10 أرقام على الأقل",
      phoneInvalid: "رقم الهاتف يحتوي على أحرف غير صالحة",
      addressMaxLength: "العنوان طويل جداً (الحد الأقصى 200 حرف)",
      general: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    },
  },
};

// ============================================================================
// Animation Variants
// ============================================================================

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
  }
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2 }
  }
};

// ============================================================================
// LeadCaptureModal Component
// ============================================================================

export function LeadCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  locale,
  calculationDetails,
}: LeadCaptureModalProps) {
  const [formData, setFormData] = useState<Omit<LeadData, 'timestamp' | 'locale' | 'calculationDetails'>>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof typeof formData>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const t = content[locale];
  const isRTL = locale === 'ar';

  // ============================================================================
  // Validation Functions
  // ============================================================================

  const validateField = (field: keyof typeof formData): string | null => {
    const value = formData[field];
    const rules = validationRules[field];

    // Check required
    if (rules.required && (!value || !value.trim())) {
      switch (field) {
        case 'fullName':
          return t.errors.fullNameRequired;
        case 'email':
          return t.errors.emailRequired;
        case 'phone':
          return t.errors.phoneRequired;
        default:
          return null;
      }
    }

    // Skip further validation if field is empty and not required
    if ((!value || !value.trim()) && !rules.required) {
      return null;
    }

    // Check minLength
    if ('minLength' in rules && value && value.trim().length < rules.minLength) {
      switch (field) {
        case 'fullName':
          return t.errors.fullNameMinLength;
        case 'phone':
          return t.errors.phoneMinLength;
        default:
          return null;
      }
    }

    // Check maxLength
    if ('maxLength' in rules && value && value.length > rules.maxLength) {
      switch (field) {
        case 'address':
          return t.errors.addressMaxLength;
        default:
          return null;
      }
    }

    // Check pattern
    if ('pattern' in rules && value && !rules.pattern.test(value)) {
      switch (field) {
        case 'fullName':
          return t.errors.fullNameInvalid;
        case 'email':
          return t.errors.emailInvalid;
        case 'phone':
          return t.errors.phoneInvalid;
        default:
          return null;
      }
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    (Object.keys(formData) as Array<keyof typeof formData>).forEach((field) => {
      const error = validateField(field);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouchedFields((prev) => new Set(prev).add(field));
    
    // Validate field on blur
    const error = validateField(field);
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouchedFields(new Set(Object.keys(formData) as Array<keyof typeof formData>));

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const leadData: LeadData = {
        ...formData,
        timestamp: new Date().toISOString(),
        locale,
        calculationDetails,
      };

      await onSubmit(leadData);

      // Show success indicator
      setShowSuccess(true);

      // Close modal after success indicator timeout
      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
        onClose();
      }, 500);
    } catch (error) {
      console.error('Lead submission error:', error);
      setErrors({ general: t.errors.general });
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !isSubmitting) {
      onClose();
    }
  };

  // ============================================================================
  // Focus Management
  // ============================================================================

  useEffect(() => {
    if (!isOpen) return;

    // Set initial focus to first input field
    const firstInput = document.querySelector<HTMLInputElement>('[name="fullName"]');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }

    // Focus trap
    const handleTabKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return;

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'input, button, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // ============================================================================
  // Render
  // ============================================================================

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onKeyDown={handleKeyDown}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={isSubmitting ? undefined : onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-heading"
          aria-describedby="modal-subtitle"
          dir={isRTL ? 'rtl' : 'ltr'}
          className="relative w-full max-w-md max-h-[90svh] overflow-y-auto bg-white/8 backdrop-blur-[24px] backdrop-saturate-[140%] border border-white/15 rounded-[24px] p-5 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.4),0_2px_8px_rgba(212,175,55,0.1)] [box-shadow:inset_0_1px_1px_rgba(255,255,255,0.15)]"
        >
          {/* Success Indicator */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                variants={successVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-[24px]"
              >
                <div className="flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="mb-6 text-center">
            <h2
              id="modal-heading"
              className="text-2xl md:text-3xl font-bold text-white mb-2"
            >
              {t.heading}
            </h2>
            <p
              id="modal-subtitle"
              className="text-sm text-gray-400"
            >
              {t.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* General Error */}
            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t.fields.fullName.label}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 backdrop-blur-[8px] transition-all duration-200 focus:outline-none focus:border-[#f59e0b] focus:shadow-[0_0_0_2px_rgba(245,158,11,0.2)]"
                placeholder={t.fields.fullName.placeholder}
                disabled={isSubmitting}
              />
              {errors.fullName && touchedFields.has('fullName') && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex items-center gap-1 mt-1 text-xs text-red-400"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t.fields.email.label}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 backdrop-blur-[8px] transition-all duration-200 focus:outline-none focus:border-[#f59e0b] focus:shadow-[0_0_0_2px_rgba(245,158,11,0.2)]"
                placeholder={t.fields.email.placeholder}
                disabled={isSubmitting}
              />
              {errors.email && touchedFields.has('email') && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex items-center gap-1 mt-1 text-xs text-red-400"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t.fields.phone.label}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 backdrop-blur-[8px] transition-all duration-200 focus:outline-none focus:border-[#f59e0b] focus:shadow-[0_0_0_2px_rgba(245,158,11,0.2)]"
                placeholder={t.fields.phone.placeholder}
                disabled={isSubmitting}
              />
              {errors.phone && touchedFields.has('phone') && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex items-center gap-1 mt-1 text-xs text-red-400"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Address (Optional) */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t.fields.address.label}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                onBlur={() => handleBlur('address')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 backdrop-blur-[8px] transition-all duration-200 focus:outline-none focus:border-[#f59e0b] focus:shadow-[0_0_0_2px_rgba(245,158,11,0.2)]"
                placeholder={t.fields.address.placeholder}
                disabled={isSubmitting}
              />
              {errors.address && touchedFields.has('address') && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex items-center gap-1 mt-1 text-xs text-red-400"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.address}
                </motion.p>
              )}
            </div>

            {/* Privacy Assurance */}
            <p className="text-xs text-gray-400 text-center">
              {t.privacy}
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-white font-bold rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.3),0_0_40px_rgba(251,191,36,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.submitting}</span>
                </>
              ) : (
                <span>{t.submit}</span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
