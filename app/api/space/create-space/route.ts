import { prisma } from '@/lib/db';
import { createSpaceSchema } from '@/lib/schemas/space.schema';
import { validateBody } from '@/lib/validate';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    const client = await clerkClient();
    const userData = client.users.getUser(userId);
    const isPro = (await userData).privateMetadata.pro === true;
    const maxSpaces = isPro ? 10 : 2;

    console.log(isPro);

    const spaceList = await prisma.space.findMany({
      where: {
        ownerEmail: user?.emailAddresses[0]?.emailAddress,
      },
    });
    if (spaceList.length >= maxSpaces) {
      return NextResponse.json(
        { error: 'Maximum space limit reached:2' },
        { status: 403 }
      );
    }
    const data = await request.json();

    const validation = validateBody(createSpaceSchema, data);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed, please check your Input!!' },
        { status: 401 }
      );
    }

    const newSpace = await prisma.space.create({
      data: data,
    });

    return NextResponse.json(newSpace);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Couldn't create space" },
      { status: 500 }
    );
  }
}
