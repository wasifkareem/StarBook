import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateQuery } from '@/lib/validate';
import { spaceQuery, spaceQuerySchema } from '@/lib/schemas/space.schema';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const validation = validateQuery(spaceQuerySchema, searchParams);

  if (!validation.success) {
    return NextResponse.json({ error: 'validation failed!!' }, { status: 400 });
  }

  const { spaceId } = validation.data as spaceQuery;
  if (!spaceId) {
    return NextResponse.json({ error: 'spaceId is required' }, { status: 400 });
  }

  try {
    const space = await prisma.space.findUnique({
      where: { id: spaceId },
      select: {
        spaceName: true,
        qOne: true,
        qTwo: true,
        qThree: true,
        imgPath: true,
        headerTitle: true,
        message: true,
        tipBox: true,
        id: true,
      },
    });

    return NextResponse.json(space, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Could not fetch review info.' },
      { status: 500 }
    );
  }
}
