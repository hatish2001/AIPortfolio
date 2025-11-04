import { NextRequest, NextResponse } from 'next/server';
import { RAGService } from '@/lib/rag/rag-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Initialize RAG service
    const ragService = RAGService.getInstance();

    // Get response from RAG pipeline
    const response = await ragService.query(message, conversationHistory || []);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Check if it's a configuration error
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { 
          error: 'Configuration error: Please set up your API keys in .env.local',
          details: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: 'An error occurred while processing your request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Chat API is running',
    timestamp: new Date().toISOString(),
  });
}

