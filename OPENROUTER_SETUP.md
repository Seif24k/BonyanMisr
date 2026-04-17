# OpenRouter API Setup Guide

## ⚠️ Important Security Notice

**NEVER share your API keys publicly!** The key you shared earlier has been removed from the code. Please follow these steps to set up a new key securely.

## Setup Steps

### 1. Get a New API Key

1. Go to [OpenRouter Keys Page](https://openrouter.ai/keys)
2. Sign in or create an account
3. Click "Create Key" to generate a new API key
4. Copy the key (it starts with `sk-or-v1-...`)

### 2. Add the Key to Your Environment

Open the `.env.local` file in the `bonyanmisr-nextjs` folder and replace `your_openrouter_api_key_here` with your actual key:

```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

### 3. Restart Your Development Server

If your Next.js server is running, restart it to load the new environment variable:

```bash
# Stop the server (Ctrl+C) then restart:
npm run dev
```

## What Changed

✅ **Switched from Hugging Face to OpenRouter**
- Better model quality and reliability
- Uses `openrouter/free` model (completely free)
- Supports multiple AI models automatically

✅ **Improved API Integration**
- Proper conversation history handling
- Better error handling
- Cleaner response format

✅ **Security Best Practices**
- API key stored in `.env.local` (not committed to git)
- Environment variable properly configured

## Testing the Chatbot

1. Start your development server: `npm run dev`
2. Open your website in a browser
3. Click the floating cube button in the bottom-right corner
4. Try asking questions like:
   - "What services does BonyanMisr offer?"
   - "Tell me about your interior design services"
   - "How can I contact you?"

## Available Models

The `openrouter/free` router automatically selects from free models including:
- Trinity Large Preview
- Nemotron 3 Nano
- Step 3.5 Flash
- And many more

You can also specify a specific model by changing the `model` parameter in `app/api/chat/route.ts`:

```typescript
model: 'openrouter/free', // or any other model like 'google/gemini-2.0-flash-exp:free'
```

## Troubleshooting

### "Failed to get response from AI"
- Check that your API key is correctly set in `.env.local`
- Make sure you restarted the dev server after adding the key
- Verify the key is valid on OpenRouter's dashboard

### Rate Limits
- Free tier has generous limits
- If you hit limits, wait a few minutes or upgrade your OpenRouter account

## Need Help?

- OpenRouter Docs: https://openrouter.ai/docs
- OpenRouter Discord: https://discord.gg/openrouter
