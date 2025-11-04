# 🚀 Quick Start - AI Chatbot

## Step 1: Create Environment File

Create a file named `.env.local` in the root directory:

```bash
# In the terminal
touch .env.local
```

## Step 2: Add API Keys

Add this to your `.env.local` file:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Get Your OpenAI API Key:
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key and paste it in `.env.local`

> **Optional**: Add Pinecone for advanced vector search (see RAG_SETUP.md)

## Step 3: Start the Server

```bash
npm run dev
```

## Step 4: Test It!

1. Open http://localhost:3000
2. Look for the orange "Ask a question..." button (bottom-right)
3. Click it and ask: "What's Harishraj's experience with AI?"

## 🎉 That's It!

Your chatbot is now live and ready to answer questions!

---

## Optional: Add Custom Documents

```bash
# Create documents folder
mkdir documents

# Add your files
# (PDFs, markdown, text files)

# Ingest them
npm run ingest-docs
```

---

## Need More Details?

- **Full Setup Guide**: See `RAG_SETUP.md`
- **Implementation Details**: See `CHATBOT_IMPLEMENTATION_SUMMARY.md`
- **Environment Variables**: See `CHATBOT_ENV_SETUP.txt`

## Troubleshooting

**Chatbot not appearing?**
- Make sure you restarted the dev server after creating `.env.local`
- Check browser console for errors
- Clear browser cache

**"Configuration error" message?**
- Verify `OPENAI_API_KEY` is set correctly in `.env.local`
- Make sure the key starts with `sk-`
- No spaces or quotes around the key

**Still having issues?**
- Check `RAG_SETUP.md` troubleshooting section
- Verify all files were created correctly
- Check console logs for detailed error messages

