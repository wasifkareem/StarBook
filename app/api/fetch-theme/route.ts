import { prisma } from '@/lib/db';
import { spaceQuery, spaceQuerySchema } from '@/lib/schemas/space.schema';
import { validateQuery } from '@/lib/validate';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const validation = validateQuery(spaceQuerySchema, searchParams);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'validationf failed' },
        { status: 400 }
      );
    }

    const { spaceId } = validation.data as spaceQuery;

    const theme = await prisma.theme.findUnique({
      where: { spaceId: spaceId },
    });

    return NextResponse.json(theme);
  } catch (error) {
    console.error('error fetching theme', error);
    return NextResponse.json(
      { error: 'error fetching themes' },
      { status: 401 }
    );
  }
}
