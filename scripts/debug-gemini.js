const { GoogleGenerativeAI } = require('@google/generative-ai');

async function main() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    console.log("Testing Gemini API...");
    try {
        const result = await model.generateContent("Hello");
        console.log("Success:", result.response.text());
    } catch (error) {
        console.log("--- ERROR CAUGHT ---");
        console.log("Error Type:", typeof error);
        console.log("Error Keys:", Object.keys(error));
        console.log("Error Message:", error.message);
        console.log("Error Status:", error.status);
        if (error.response) {
            console.log("Error Response:", JSON.stringify(error.response));
        }
        console.log("Full Error Stringify:", JSON.stringify(error, null, 2));
    }
}

main();
