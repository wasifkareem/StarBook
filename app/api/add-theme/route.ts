import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { isDark, spaceId, field, theme } = data;

    const updatedTheme = await prisma.theme.upsert({
      where: { spaceId: spaceId },
      update: {
        isDark: isDark,
        field: field,
        theme: theme,
      },
      create: {
        isDark: isDark,
        spaceId: spaceId,
        field: field,
        theme: theme,
      },
    });

    return NextResponse.json(updatedTheme, { status: 200 });
  } catch (error) {
    console.error('error adding theme', error);
    return NextResponse.json({ error: 'Error adding theme' }, { status: 500 });
  }
}
