const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const logPath = path.join(__dirname, '../available_models.log');
    let logContent = "Fetching available models...\n";

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            logContent += "No API Key found!\n";
            fs.writeFileSync(logPath, logContent);
            return;
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            logContent += `API Error: ${JSON.stringify(data.error, null, 2)}\n`;
        } else {
            logContent += "Available Models:\n";
            if (data.models) {
                data.models.forEach(m => {
                    if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                        logContent += `- ${m.name} (Supported methods: ${m.supportedGenerationMethods.join(', ')})\n`;
                    }
                });
            } else {
                logContent += "No models returned in list.\n";
            }
        }
    } catch (error) {
        logContent += `Error listing models: ${error}\n`;
    }

    fs.writeFileSync(logPath, logContent);
    console.log("Models written to available_models.log");
}

listModels();
