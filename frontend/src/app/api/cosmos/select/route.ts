import { selectCosmosData } from '@/models/cosmosdb/cosmosApplicationService';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

export const GET = async (req: NextRequest) => {
  try {
    console.log('🚀 ~ GET ~ CosmosDBの処理開始');
    // CosmosDB
    const result = await selectCosmosData();
    console.log('🚀 ~ GET ~ result:', result);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ aiMessage: error.message }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';
