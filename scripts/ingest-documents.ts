/**
 * Document Ingestion Script
 * 
 * This script processes documents and ingests them into the vector store.
 * 
 * Usage:
 *   npm run ingest-docs
 * 
 * Or with custom directory:
 *   npm run ingest-docs -- --dir /path/to/documents
 */

import { DocumentProcessor } from '../lib/rag/document-processor';
import { RAGService } from '../lib/rag/rag-service';
import { contentData } from '../lib/data';
import path from 'path';

async function main() {
  console.log('🚀 Starting document ingestion...\n');

  try {
    // Initialize services
    const processor = new DocumentProcessor();
    const ragService = RAGService.getInstance();

    const allDocuments = [];

    // 1. Process structured data from the website
    console.log('📊 Processing website data...');
    const structuredDocs = processor.processStructuredData(contentData, 'website');
    allDocuments.push(...structuredDocs);
    console.log(`✅ Processed ${structuredDocs.length} documents from website data\n`);

    // 2. Process documents from the documents directory (if exists)
    const docsDir = path.join(process.cwd(), 'documents');
    try {
      console.log('📄 Looking for documents in ./documents directory...');
      const fileDocs = await processor.processDirectory(docsDir);
      allDocuments.push(...fileDocs);
      console.log(`✅ Processed ${fileDocs.length} documents from files\n`);
    } catch (error) {
      console.log('ℹ️  No documents directory found or empty. Skipping file processing.\n');
    }

    // 3. Process resume PDFs from public/files
    const filesDir = path.join(process.cwd(), 'public', 'files');
    try {
      console.log('📋 Processing resume files...');
      const resumeDocs = await processor.processDirectory(filesDir);
      allDocuments.push(...resumeDocs);
      console.log(`✅ Processed ${resumeDocs.length} documents from resume files\n`);
    } catch (error) {
      console.log('ℹ️  Could not process resume files.\n');
    }

    // 4. Ingest all documents into vector store
    if (allDocuments.length === 0) {
      console.log('⚠️  No documents to ingest. Add documents to the ./documents directory.\n');
      return;
    }

    console.log(`📥 Ingesting ${allDocuments.length} total documents into vector store...`);
    await ragService.ingestDocuments(allDocuments);
    console.log('✅ Successfully ingested all documents!\n');

    console.log('🎉 Document ingestion complete!');
    console.log(`\nSummary:`);
    console.log(`  - Total documents processed: ${allDocuments.length}`);
    console.log(`  - Vector store updated successfully`);
    console.log(`\nYou can now use the chatbot to query this information! 🤖\n`);

  } catch (error) {
    console.error('❌ Error during ingestion:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('PINECONE_API_KEY')) {
        console.error('\n💡 Make sure to set PINECONE_API_KEY in your .env.local file');
      } else if (error.message.includes('OPENAI_API_KEY')) {
        console.error('\n💡 Make sure to set OPENAI_API_KEY in your .env.local file');
      }
    }
    
    process.exit(1);
  }
}

// Run the script
main();

