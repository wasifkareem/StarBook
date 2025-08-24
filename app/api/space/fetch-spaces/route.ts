import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateQuery } from '@/lib/validate';
import { fetchSpacesSchema, fetchSpaces } from '@/lib/schemas/space.schema';

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);

        // Use the validateQuery function with the imported schema
        const validation = validateQuery(fetchSpacesSchema, searchParams);
        if (!validation.success) {
            return NextResponse.json(
                { error : 'Validation failed' },
                { status: 400 }
            );
        }

        const { email } = validation.data as fetchSpaces;

        const spaces = await prisma.space.findMany({
            where: { ownerEmail: email },
            include: {
                _count: {
                    select: { testimonials: true }
                }
            }
        });

        return NextResponse.json(spaces);
    } catch (error) {
        console.error('Error fetching spaces:', error);
        return NextResponse.json(
            { error: 'Could not fetch spaces.' },
            { status: 500 }
        );
    }
}
