/**
 * Input Sanitization Utilities
 * Prevents XSS, SQL injection, and other malicious inputs
 */

/**
 * Sanitize string input by removing potentially dangerous characters
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove control characters except newlines and tabs
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Limit length to prevent DoS
    .slice(0, 1000);
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  const sanitized = sanitizeString(email).toLowerCase();
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    throw new Error('Invalid email format');
  }
  
  return sanitized;
}

/**
 * Sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  const sanitized = sanitizeString(phone);
  
  // Remove all non-digit, non-space, non-dash, non-parentheses, non-plus characters
  const cleaned = sanitized.replace(/[^\d\s\-\(\)\+]/g, '');
  
  // Check minimum length
  if (cleaned.replace(/[\s\-\(\)\+]/g, '').length < 10) {
    throw new Error('Phone number too short');
  }
  
  return cleaned;
}

/**
 * Sanitize name (allows letters, spaces, hyphens, apostrophes)
 */
export function sanitizeName(name: string): string {
  const sanitized = sanitizeString(name);
  
  // Allow English letters, Arabic letters, spaces, hyphens, apostrophes
  const cleaned = sanitized.replace(/[^a-zA-Z\u0600-\u06FF\s'\-]/g, '');
  
  if (cleaned.length < 2) {
    throw new Error('Name too short');
  }
  
  if (cleaned.length > 100) {
    throw new Error('Name too long');
  }
  
  return cleaned;
}

/**
 * Sanitize address
 */
export function sanitizeAddress(address: string): string {
  const sanitized = sanitizeString(address);
  
  if (sanitized.length > 200) {
    throw new Error('Address too long');
  }
  
  return sanitized;
}

/**
 * Sanitize locale
 */
export function sanitizeLocale(locale: string): 'en' | 'ar' {
  const sanitized = sanitizeString(locale).toLowerCase();
  
  if (sanitized !== 'en' && sanitized !== 'ar') {
    return 'en'; // Default to English
  }
  
  return sanitized as 'en' | 'ar';
}

/**
 * Sanitize number input
 */
export function sanitizeNumber(input: any): number | null {
  const num = parseFloat(input);
  
  if (isNaN(num) || !isFinite(num)) {
    return null;
  }
  
  return num;
}

/**
 * Sanitize enum value
 */
export function sanitizeEnum<T extends string>(
  input: string,
  allowedValues: T[]
): T | null {
  const sanitized = sanitizeString(input).toLowerCase();
  
  if (allowedValues.includes(sanitized as T)) {
    return sanitized as T;
  }
  
  return null;
}

/**
 * Sanitize all lead data
 */
export interface SanitizedLeadData {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  locale: 'en' | 'ar';
  timestamp: string;
  area?: number;
  propertyType?: 'residential' | 'commercial';
  finishingLevel?: 'economic' | 'standard' | 'luxury';
  estimatedCostMin?: number;
  estimatedCostMax?: number;
}

export function sanitizeLeadData(data: any): SanitizedLeadData {
  try {
    const sanitized: SanitizedLeadData = {
      fullName: sanitizeName(data.fullName),
      email: sanitizeEmail(data.email),
      phone: sanitizePhone(data.phone),
      locale: sanitizeLocale(data.locale),
      timestamp: sanitizeString(data.timestamp),
    };

    // Optional fields
    if (data.address) {
      sanitized.address = sanitizeAddress(data.address);
    }

    // Calculation details
    if (data.calculationDetails) {
      const details = data.calculationDetails;
      
      const area = sanitizeNumber(details.area);
      if (area !== null && area > 0) {
        sanitized.area = area;
      }

      const propertyType = sanitizeEnum(details.propertyType, ['residential', 'commercial']);
      if (propertyType) {
        sanitized.propertyType = propertyType;
      }

      const finishingLevel = sanitizeEnum(details.finishingLevel, ['economic', 'standard', 'luxury']);
      if (finishingLevel) {
        sanitized.finishingLevel = finishingLevel;
      }

      if (details.estimatedCost) {
        const min = sanitizeNumber(details.estimatedCost.min);
        const max = sanitizeNumber(details.estimatedCost.max);
        
        if (min !== null && min > 0) {
          sanitized.estimatedCostMin = min;
        }
        
        if (max !== null && max > 0) {
          sanitized.estimatedCostMax = max;
        }
      }
    }

    return sanitized;
  } catch (error) {
    throw new Error(`Sanitization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
