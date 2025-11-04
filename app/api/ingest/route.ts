import { NextRequest, NextResponse } from 'next/server';
import { DocumentProcessor } from '@/lib/rag/document-processor';
import { RAGService } from '@/lib/rag/rag-service';
import { contentData } from '@/lib/data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * API endpoint to trigger document ingestion
 * This is useful for updating the vector store without running a script
 * 
 * POST /api/ingest
 * Body: { secret: 'your-secret-key' }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Simple authentication - you should use a proper auth mechanism in production
    const expectedSecret = process.env.INGESTION_SECRET || 'change-me-in-production';
    if (body.secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const processor = new DocumentProcessor();
    const ragService = RAGService.getInstance();

    // Process structured data from website
    console.log('Processing website data...');
    const structuredDocs = processor.processStructuredData(contentData, 'website');

    // Ingest into vector store
    console.log(`Ingesting ${structuredDocs.length} documents...`);
    await ragService.ingestDocuments(structuredDocs);

    return NextResponse.json({
      success: true,
      message: 'Documents ingested successfully',
      documentsProcessed: structuredDocs.length,
    });

  } catch (error) {
    console.error('Ingestion API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to ingest documents',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Document ingestion API',
    usage: 'POST /api/ingest with { secret: "your-secret" } in body',
  });
}

