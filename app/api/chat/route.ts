import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a helpful assistant for BonyanMisr, a premium construction and interior design company in Egypt.

Company Information:
- Company Name: BonyanMisr (بنيان مصر)
- Core Services: Construction, Interior Design, Finishing
- Location: Cairo, Egypt
- Contact: +20 11 11939293
- Website: www.bonyanmisr.com
- LinkedIn: www.linkedin.com/in/bonyan-misr-بنيان-مصر-b450883a7

Your Role:
- Answer questions about the company's services, project portfolio, and contact information.
- Provide professional, polite, and concise responses.
- Can reply in both English and Arabic depending on the user's language.
- Do not make up facts about specific past projects if you don't know them.
- If unsure, ask the user to contact the sales team directly.
`;

export async function POST(req: NextRequest) {
    try {
        const { message, conversationHistory } = await req.json();

        // Build messages array for OpenRouter
        const messages = [
            {
                role: 'system',
                content: SYSTEM_PROMPT
            },
            ...conversationHistory,
            {
                role: 'user',
                content: message
            }
        ];

        // Call OpenRouter API
        const response = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
                    'X-Title': 'BonyanMisr Assistant',
                },
                body: JSON.stringify({
                    model: 'openrouter/free', // Uses free models
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 500,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error('OpenRouter API error:', response.status, errorData);
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract assistant message from OpenRouter response
        const assistantMessage = data.choices?.[0]?.message?.content || 
            'I apologize, but I could not process that request.';

        return NextResponse.json({ message: assistantMessage });

    } catch (error: any) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Failed to get response from AI' },
            { status: 500 }
        );
    }
}
