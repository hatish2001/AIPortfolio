# RAG Chatbot Setup Guide

This guide will help you set up the AI-powered chatbot with RAG (Retrieval Augmented Generation) for your portfolio website.

## 📋 Overview

The chatbot uses:
- **OpenAI GPT-4** for generating responses
- **Pinecone** for vector storage (optional - works without it)
- **LangChain** for RAG orchestration
- **Next.js API Routes** for backend

## 🚀 Quick Start

### 1. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
PINECONE_API_KEY=your-pinecone-api-key-here  # Optional
PINECONE_INDEX_NAME=portfolio-chatbot
```

### 2. Get API Keys

#### OpenAI API Key (Required)
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy and paste it into `.env.local`

#### Pinecone API Key (Optional but Recommended)
1. Go to [Pinecone](https://app.pinecone.io/)
2. Sign up for a free account
3. Create a new index:
   - **Name**: `portfolio-chatbot`
   - **Dimensions**: `1536` (for text-embedding-3-small)
   - **Metric**: `cosine`
4. Copy your API key from the dashboard
5. Paste it into `.env.local`

> **Note**: If you don't set up Pinecone, the chatbot will still work using a fallback mode that extracts information from your website data (`lib/data.ts`).

### 3. Install Dependencies (Already Done)

The following packages have been installed:
- `openai` - OpenAI API client
- `@pinecone-database/pinecone` - Pinecone vector database
- `langchain` - LangChain framework
- `@langchain/openai` - OpenAI integration for LangChain
- `@langchain/community` - Community integrations
- `pdf-parse` - PDF parsing for documents

### 4. Ingest Documents (Optional)

The chatbot is already configured to use your website data. To add additional documents:

#### Option A: Add documents to the `documents/` folder

1. Create a `documents` folder in the root:
   ```bash
   mkdir documents
   ```

2. Add your documents (PDF, TXT, MD files):
   ```
   documents/
     ├── additional-info.pdf
     ├── project-details.md
     └── research-papers.pdf
   ```

3. Run the ingestion script:
   ```bash
   npm run ingest-docs
   ```

#### Option B: Use the API endpoint

Send a POST request to `/api/ingest`:

```bash
curl -X POST http://localhost:3000/api/ingest \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-ingestion-secret"}'
```

## 🎨 Using the Chatbot

### For Visitors

1. Look for the orange "Ask a question..." button in the bottom-right corner
2. Click it to open the chat sidebar
3. Type your question about you (the portfolio owner)
4. Get instant AI-powered responses!

### Keyboard Shortcut

Press `Cmd + I` (Mac) or `Ctrl + I` (Windows/Linux) to toggle the chatbot.

## 📁 Project Structure

```
lib/
├── rag/
│   ├── rag-service.ts           # Core RAG service
│   └── document-processor.ts    # Document processing utilities
app/
├── api/
│   ├── chat/
│   │   └── route.ts             # Chat API endpoint
│   └── ingest/
│       └── route.ts             # Document ingestion API
components/
└── ChatBot.tsx                  # Chat UI component
scripts/
└── ingest-documents.ts          # CLI ingestion script
```

## 🔧 Configuration

### Chatbot Behavior

Edit `lib/rag/rag-service.ts` to customize:
- System prompts
- Response temperature
- Context length
- Model selection (GPT-4, GPT-3.5, etc.)

### Document Processing

Edit `lib/rag/document-processor.ts` to adjust:
- Chunk size (default: 1000 characters)
- Chunk overlap (default: 200 characters)
- Supported file types

### UI Customization

Edit `components/ChatBot.tsx` to modify:
- Colors and styling
- Welcome messages
- Suggested questions
- Animation behavior

## 📊 How It Works

### RAG Pipeline

1. **User Query**: User asks a question
2. **Embedding**: Query is converted to vector embedding
3. **Retrieval**: Similar content is retrieved from vector store
4. **Augmentation**: Retrieved context is added to the prompt
5. **Generation**: GPT-4 generates a response using the context
6. **Response**: Answer is returned to the user

### Fallback Mode

If Pinecone is not configured:
- System uses keyword matching on your website data
- Still provides accurate responses about your portfolio
- No vector search, but fast and free
- Great for development and testing

## 🧪 Testing

### Test the Chat API

```bash
# Check API status
curl http://localhost:3000/api/chat

# Send a test message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Harishraj'\''s experience?"}'
```

### Test Document Ingestion

```bash
# Create a test document
echo "Harishraj loves building AI systems." > documents/test.txt

# Run ingestion
npm run ingest-docs
```

## 🚨 Troubleshooting

### "Configuration error: Please set up your API keys"
- Check that `.env.local` exists
- Verify `OPENAI_API_KEY` is set correctly
- Restart your development server: `npm run dev`

### "Pinecone is not initialized"
- This is normal if you haven't set up Pinecone
- The chatbot will work in fallback mode
- To enable full RAG, add `PINECONE_API_KEY` to `.env.local`

### Chatbot gives incorrect information
- Run document ingestion to update the vector store
- Check that your `lib/data.ts` is up to date
- Verify your documents are in the correct format

### Build errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Check Node.js version: `node -v` (should be 18+)

## 💰 Cost Considerations

### OpenAI Costs
- Embeddings: ~$0.0001 per 1K tokens
- GPT-4-mini responses: ~$0.00015 per 1K tokens (input) + ~$0.0006 per 1K tokens (output)
- Typical query cost: $0.001 - $0.005

### Pinecone Costs
- Free tier: 1 index, 100K vectors
- Sufficient for most portfolio sites
- Upgrade if you need more capacity

## 🔒 Security Notes

1. **API Keys**: Never commit `.env.local` to git
2. **Ingestion Secret**: Change the default secret in production
3. **Rate Limiting**: Consider adding rate limiting to API routes
4. **CORS**: Configure CORS if deploying to production

## 📚 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Pinecone Documentation](https://docs.pinecone.io)
- [LangChain Documentation](https://js.langchain.com/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🎯 Next Steps

1. ✅ Set up environment variables
2. ✅ Test the chatbot locally
3. 📄 Add your custom documents to `documents/`
4. 🚀 Run document ingestion
5. 🌐 Deploy to production (Vercel recommended)

---

**Need help?** Check the console logs for detailed error messages, or refer to the troubleshooting section above.

