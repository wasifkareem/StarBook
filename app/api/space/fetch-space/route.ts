import { prisma } from '@/lib/db';
import { spaceQuery, spaceQuerySchema } from '@/lib/schemas/space.schema';
import { validateQuery } from '@/lib/validate';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const validation = validateQuery(spaceQuerySchema, searchParams);

    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 401 });
    }

    const { spaceId } = validation.data as spaceQuery;

    const space = await prisma.space.findUnique({
      where: { id: spaceId },
      include: {
        testimonials: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    return NextResponse.json(space);
  } catch (error) {
    console.error('Err fetching this space', error);
  }
}
