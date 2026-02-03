# Setting Up the AI Chatbot

## Quick Start Guide

### 1. Get Your Free Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click **"Get API Key"** or **"Get Started"**
3. Sign in with your Google account
4. Click **"Create API Key"**
5. Copy the generated API key

### 2. Add API Key to Environment Variables

1. Open `.env.local` file in the project root
2. Find the line: `GEMINI_API_KEY=`
3. Paste your API key after the `=` sign:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
4. Save the file

### 3. Restart the Development Server

If the server is already running, restart it:

```bash
# Stop the server (Ctrl+C)
# Then start again:
npm run dev
```

### 4. Test the Chatbot

1. Open your website in the browser
2. Look for the **gold chat button** in the bottom-right corner
3. Click it to open the chat window
4. Type a message and press Send!

## Troubleshooting

**Chatbot says "currently unavailable"?**
- Make sure you added the API key to `.env.local`
- Restart the development server
- Check that the API key is valid (no spaces, correct format)

**Button appears but no response?**
- Check the browser console for errors (F12 → Console)
- Verify your internet connection
- Check if you've exceeded the free tier limit (1,000 requests/day)

**Need help?**
- Free tier limits: https://ai.google.dev/pricing
- API documentation: https://ai.google.dev/docs
