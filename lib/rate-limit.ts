import { NextRequest } from 'next/server';

// Simple in-memory rate limiter
// For production, use Redis or a dedicated service like Upstash

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<{ success: boolean; remaining: number }> => {
    // Get client identifier (IP address)
    const identifier = 
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const now = Date.now();
    const key = `${identifier}`;

    // Initialize or get existing rate limit data
    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 0,
        resetTime: now + config.interval,
      };
    }

    // Increment request count
    store[key].count++;

    // Check if limit exceeded
    const success = store[key].count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - store[key].count);

    return { success, remaining };
  };
}

// Predefined rate limiters
export const apiRateLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute per IP
});

export const strictRateLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  maxRequests: 3, // 3 requests per minute per IP (for sensitive endpoints)
});
