import { startAgentTest } from '@/models/webapps/webappsApplicationService';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

export const POST = async (req: NextRequest) => {
  try {
    const { message } = await req.json();
    console.log('🚀 ~ POST ~ message:', message);
    // OpenAI へのリクエスト
    const result = await startAgentTest(message);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ aiMessage: error.message }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';
