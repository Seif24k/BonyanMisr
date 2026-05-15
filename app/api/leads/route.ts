import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiRateLimiter } from '@/lib/rate-limit';
import { sanitizeLeadData } from '@/lib/sanitize';

// CORS configuration - only allow your domain
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://yourdomain.com', // Replace with your actual domain
  'https://www.yourdomain.com', // Replace with your actual domain
];

// POST /api/leads - Create a new lead
export async function POST(request: NextRequest) {
  try {
    // 1. CORS Check
    const origin = request.headers.get('origin');
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: 'CORS policy violation' },
        { status: 403 }
      );
    }

    // 2. Rate Limiting
    const rateLimitResult = await apiRateLimiter(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          }
        }
      );
    }

    // 3. Parse and validate body size
    const body = await request.json();
    const bodySize = JSON.stringify(body).length;
    if (bodySize > 10000) { // 10KB limit
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      );
    }

    // 4. Sanitize and validate all inputs
    let sanitizedData;
    try {
      sanitizedData = sanitizeLeadData(body);
    } catch (sanitizeError) {
      return NextResponse.json(
        { error: sanitizeError instanceof Error ? sanitizeError.message : 'Invalid input data' },
        { status: 400 }
      );
    }

    // 5. Get client IP and User Agent for tracking (sanitized)
    const ipAddress = (
      request.headers.get('x-forwarded-for')?.split(',')[0] || 
      request.headers.get('x-real-ip') || 
      'unknown'
    ).slice(0, 45); // Limit length

    const userAgent = (request.headers.get('user-agent') || 'unknown').slice(0, 500); // Limit length

    // 6. Create lead in database
    const lead = await prisma.lead.create({
      data: {
        fullName: sanitizedData.fullName,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        address: sanitizedData.address || null,
        locale: sanitizedData.locale,
        timestamp: sanitizedData.timestamp,
        area: sanitizedData.area || null,
        propertyType: sanitizedData.propertyType || null,
        finishingLevel: sanitizedData.finishingLevel || null,
        estimatedCostMin: sanitizedData.estimatedCostMin || null,
        estimatedCostMax: sanitizedData.estimatedCostMax || null,
        ipAddress,
        userAgent,
        referralSource: body.referralSource?.slice(0, 100) || null,
      },
    });

    // 7. Log success (minimal info for security)
    if (process.env.NODE_ENV === 'development') {
      console.log('Lead created:', lead.id);
    }

    // 8. Return success response
    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        message: 'Lead captured successfully',
      },
      { 
        status: 201,
        headers: {
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        }
      }
    );
  } catch (error) {
    // Log error securely (don't expose details to client)
    console.error('Lead creation error:', error instanceof Error ? error.message : 'Unknown error');

    // Handle duplicate email
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'This email has already been submitted' },
        { status: 409 }
      );
    }

    // Generic error response (don't expose internal details)
    return NextResponse.json(
      { error: 'Failed to save lead. Please try again.' },
      { status: 500 }
    );
  }
}

// GET /api/leads - Get all leads (PROTECTED - requires authentication)
export async function GET(request: NextRequest) {
  try {
    // 1. Authentication Check
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    // If no admin password is set, deny access
    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Admin access not configured' },
        { status: 503 }
      );
    }

    // Check for Basic Auth or Bearer token
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { 
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Admin Area"',
          }
        }
      );
    }

    // Verify password
    let isAuthenticated = false;

    if (authHeader.startsWith('Basic ')) {
      // Basic Auth
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');
      
      isAuthenticated = password === adminPassword;
    } else if (authHeader.startsWith('Bearer ')) {
      // Bearer token
      const token = authHeader.split(' ')[1];
      isAuthenticated = token === adminPassword;
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 2. Rate Limiting (stricter for admin endpoints)
    const rateLimitResult = await apiRateLimiter(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // 3. Pagination
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50'))); // Max 100 per page
    const skip = (page - 1) * limit;

    // 4. Fetch leads
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        // Don't expose sensitive fields like ipAddress and userAgent to frontend
        select: {
          id: true,
          createdAt: true,
          fullName: true,
          email: true,
          phone: true,
          address: true,
          locale: true,
          area: true,
          propertyType: true,
          finishingLevel: true,
          estimatedCostMin: true,
          estimatedCostMax: true,
          ipAddress: true, // Include for admin
        },
      }),
      prisma.lead.count(),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
