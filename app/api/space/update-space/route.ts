import { prisma } from '@/lib/db';
import { spaceQuery, spaceQuerySchema } from '@/lib/schemas/space.schema';
import { validateQuery } from '@/lib/validate';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // const spaceId = searchParams.get('spaceId');
    const validation = validateQuery(spaceQuerySchema, searchParams);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 401 });
    }

    const { spaceId } = validation.data as spaceQuery;
    const data = await request.json();

    const updatedSpace = await prisma.space.update({
      where: {
        id: spaceId,
      },
      data,
    });

    return NextResponse.json(updatedSpace, { status: 200 });
  } catch (error) {
    console.error('Error updating ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
