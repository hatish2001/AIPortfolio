# Documents Directory

This directory is for storing additional documents that you want the AI chatbot to learn from and reference when answering questions.

## Supported File Types

- **PDF** (.pdf) - Research papers, presentations, detailed project reports
- **Markdown** (.md) - Documentation, notes, blog posts
- **Text** (.txt) - Plain text notes and information

## How to Add Documents

1. Place your files in this directory
2. Organize with subdirectories if needed
3. Run the ingestion script:
   ```bash
   npm run ingest-docs
   ```

## Example Structure

```
documents/
├── README.md (this file)
├── projects/
│   ├── compliance-ai-detailed.pdf
│   └── mistral-finetuning-notes.md
├── research/
│   ├── av-hubert-paper.pdf
│   └── rag-implementation-notes.txt
├── achievements/
│   ├── awards.md
│   └── certifications.pdf
└── additional-info.md
```

## Tips

- **Be Specific**: Use descriptive filenames
- **Keep Updated**: Re-run ingestion after adding/updating files
- **Organize**: Use subdirectories for different topics
- **Quality Over Quantity**: Add documents that provide value to recruiters
- **Avoid Duplicates**: Don't duplicate information already on your website

## What Gets Ingested

When you run `npm run ingest-docs`, the system will:
1. ✅ Process all files in this directory (recursively)
2. ✅ Process your resume from `public/files/`
3. ✅ Extract data from your website (`lib/data.ts`)
4. ✅ Create embeddings for semantic search
5. ✅ Upload to Pinecone vector store

## Current Status

- 📁 Directory created
- 📄 Ready for documents
- 🚀 Run `npm run ingest-docs` after adding files

---

**Note**: This directory is optional. The chatbot works perfectly fine with just your website data!

