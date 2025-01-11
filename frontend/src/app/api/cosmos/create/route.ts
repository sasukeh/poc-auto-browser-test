import { createCosmosData } from '@/models/cosmosdb/cosmosApplicationService';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

export const GET = async (req: NextRequest) => {
  try {
    // CosmosDB
    const result = await createCosmosData();
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ aiMessage: error.message }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';
