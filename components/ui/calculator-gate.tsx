'use client';

import { useState, useEffect } from 'react';
import { Lock, LockOpen, Shield, CreditCard, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalculatorGateProps {
  onUnlock: (data: FormData) => void;
}

interface FormData {
  fullName: string;
  phone: string;
  city: string;
  unitType: string;
  referralSource?: string;
}

const STORAGE_KEY = 'calculator_access_granted';
const EXPIRY_DAYS = 7;

export function CalculatorGate({ onUnlock }: CalculatorGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockAnimating, setLockAnimating] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    city: '',
    unitType: '',
    referralSource: '',
  });

  useEffect(() => {
    // Check if user has already unlocked within the last 7 days
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const { timestamp } = JSON.parse(stored);
      const daysSince = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
      if (daysSince < EXPIRY_DAYS) {
        setIsUnlocked(true);
        setTimeout(() => onUnlock(formData), 100);
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Egyptian phone number';
    }

    if (!formData.city) {
      newErrors.city = 'Please select a city';
    }

    if (!formData.unitType) {
      newErrors.unitType = 'Please select a unit type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Shake animation for errors
      return;
    }

    setIsSubmitting(true);
    setLockAnimating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store access grant with timestamp
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data: formData,
      })
    );

    setIsUnlocked(true);
    
    // Trigger unlock callback after animation
    setTimeout(() => {
      onUnlock(formData);
    }, 800);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (isUnlocked) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f1e]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10, 15, 30, 0.95), rgba(10, 15, 30, 0.95)),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
          `,
        }}
      >
        {/* Floating Gold Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#f5a623] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Gate Card */}
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: isSubmitting ? 1.05 : 1, y: 0 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-[480px] bg-[#1a2235] rounded-[20px] p-8 shadow-2xl"
          style={{
            border: '1px solid rgba(245, 166, 35, 0.3)',
            boxShadow: '0 0 40px rgba(245, 166, 35, 0.15)',
          }}
        >
          {/* Lock Icon */}
          <motion.div
            className="flex justify-center mb-6"
            animate={lockAnimating ? { scale: [1, 1.2, 0], rotate: [0, 0, 90] } : {}}
            transition={{ duration: 0.6 }}
          >
            {lockAnimating ? (
              <LockOpen className="w-12 h-12 text-[#f5a623]" />
            ) : (
              <Lock className="w-12 h-12 text-[#f5a623]" />
            )}
          </motion.div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            Unlock Your Free Cost Estimate
          </h2>

          {/* Subtext */}
          <p className="text-gray-400 text-center mb-8 text-sm">
            Fill in your details and get instant access to our finishing cost calculator — no fees, no
            commitment
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-4 py-3 bg-[#0f1829] border rounded-[10px] text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:border-[#f5a623] focus:shadow-[0_0_15px_rgba(245,166,35,0.3)] ${
                  errors.fullName
                    ? 'border-red-500 animate-shake'
                    : 'border-[rgba(245,166,35,0.2)]'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-3 bg-[#0f1829] border rounded-[10px] text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:border-[#f5a623] focus:shadow-[0_0_15px_rgba(245,166,35,0.3)] ${
                  errors.phone ? 'border-red-500 animate-shake' : 'border-[rgba(245,166,35,0.2)]'
                }`}
                placeholder="010XXXXXXXX"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* City / Area */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">City / Area</label>
              <select
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full px-4 py-3 bg-[#0f1829] border rounded-[10px] text-white transition-all duration-300 focus:outline-none focus:border-[#f5a623] focus:shadow-[0_0_15px_rgba(245,166,35,0.3)] ${
                  errors.city ? 'border-red-500 animate-shake' : 'border-[rgba(245,166,35,0.2)]'
                }`}
              >
                <option value="">Select your city</option>
                <option value="Cairo">Cairo</option>
                <option value="Giza">Giza</option>
                <option value="Alexandria">Alexandria</option>
                <option value="New Cairo">New Cairo</option>
                <option value="6th of October">6th of October</option>
                <option value="Other">Other</option>
              </select>
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            {/* Unit Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Unit Type</label>
              <div className="grid grid-cols-3 gap-3">
                {['Apartment', 'Villa', 'Commercial'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInputChange('unitType', type)}
                    className={`px-4 py-3 rounded-[10px] font-medium transition-all duration-300 ${
                      formData.unitType === type
                        ? 'bg-[#f5a623] text-[#0a0f1e] shadow-[0_0_15px_rgba(245,166,35,0.4)]'
                        : 'bg-[#0f1829] text-gray-400 border border-[rgba(245,166,35,0.2)] hover:border-[#f5a623]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.unitType && (
                <p className="text-red-500 text-xs mt-1">{errors.unitType}</p>
              )}
            </div>

            {/* How did you hear about us? */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                How did you hear about us? (Optional)
              </label>
              <select
                value={formData.referralSource}
                onChange={(e) => handleInputChange('referralSource', e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1829] border border-[rgba(245,166,35,0.2)] rounded-[10px] text-white transition-all duration-300 focus:outline-none focus:border-[#f5a623] focus:shadow-[0_0_15px_rgba(245,166,35,0.3)]"
              >
                <option value="">Select an option</option>
                <option value="Google Search">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend Referral">Friend Referral</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#f5a623] hover:bg-[#e8c547] text-[#0a0f1e] font-bold rounded-[10px] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(245,166,35,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#0a0f1e] border-t-transparent rounded-full animate-spin" />
                  <span>Unlocking...</span>
                </>
              ) : (
                <>
                  <span>Get Free Access</span>
                  <span>→</span>
                </>
              )}
            </button>

            {/* Trust Signals */}
            <div className="mt-6 space-y-4">
              <p className="text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-[#f5a623]" />
                Your info is private and never shared
              </p>

              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-gray-400">
                  <Zap className="w-4 h-4 text-[#f5a623]" />
                  <span>Free Tool</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <CreditCard className="w-4 h-4 text-[#f5a623]" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Zap className="w-4 h-4 text-[#f5a623]" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </AnimatePresence>
  );
}
