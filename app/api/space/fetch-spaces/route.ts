import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateQuery } from '@/lib/validate';
import { fetchSpacesSchema, fetchSpaces } from '@/lib/schemas/space.schema';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const client = await clerkClient();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await client.users.getUser(userId);
    const { searchParams } = new URL(request.url);

    // Use the validateQuery function with the imported schema
    const validation = validateQuery(fetchSpacesSchema, searchParams);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    const { email } = validation.data as fetchSpaces;

    const spaces = await prisma.space.findMany({
      where: { ownerEmail: email },
      orderBy: { createdAt: 'asc' },
      include: {
        _count: {
          select: { testimonials: true },
        },
      },
    });

    return NextResponse.json(spaces, user.privateMetadata);
  } catch (error) {
    console.error('Error fetching spaces:', error);
    return NextResponse.json(
      { error: 'Could not fetch spaces.' },
      { status: 500 }
    );
  }
}
