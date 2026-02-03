import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a helpful assistant for BonyanMisr, a premium construction and interior design company in Egypt.

Company Information:
- Company Name: BonyanMisr (بنيان مصر)
- Core Services: Construction, Interior Design, Finishing
- Location: Cairo, Egypt
- Contact: +201000000000
- Website: www.bonyanmisr.com

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

        // Build conversation context
        let conversationText = SYSTEM_PROMPT + '\n\n';
        
        conversationHistory.forEach((msg: any) => {
            conversationText += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
        });
        
        conversationText += `User: ${message}\nAssistant:`;

        // Call Hugging Face Inference API using new router endpoint
        const response = await fetch(
            'https://api-inference.huggingface.co/models/google/flan-t5-large',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: `${SYSTEM_PROMPT}\n\nConversation:\n${conversationHistory.map((m: any) => `${m.role}: ${m.content}`).join('\n')}\nuser: ${message}\nassistant:`,
                    parameters: {
                        max_new_tokens: 250,
                        temperature: 0.7,
                        do_sample: true,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Hugging Face API error:', response.status, errorData);
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Handle different response formats
        let assistantMessage = '';
        if (Array.isArray(data) && data[0]?.generated_text) {
            assistantMessage = data[0].generated_text.trim();
        } else if (data.generated_text) {
            assistantMessage = data.generated_text.trim();
        } else if (data.error) {
            // Model is loading, retry after a moment
            if (data.error.includes('loading')) {
                return NextResponse.json({ 
                    message: 'The AI model is warming up. Please try again in a moment.' 
                });
            }
            throw new Error(data.error);
        } else {
            assistantMessage = 'I apologize, but I could not process that request.';
        }

        return NextResponse.json({ message: assistantMessage });

    } catch (error: any) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Failed to get response from AI' },
            { status: 500 }
        );
    }
}
