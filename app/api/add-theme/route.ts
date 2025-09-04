import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { isDark, spaceId, field } = data;

        const theme = await prisma.theme.upsert({
            where: { spaceId: spaceId },
            update: { 
                isDark: isDark,
                field:field
            },
            create: {
                isDark: isDark,
                spaceId: spaceId,
                field:field
            }
        });

        return NextResponse.json(theme, { status: 200 });
        
    } catch (error) {
        console.error('error adding theme', error);
        return NextResponse.json(
            { error: 'Error adding theme' },
            { status: 500 }
        );
    }
}