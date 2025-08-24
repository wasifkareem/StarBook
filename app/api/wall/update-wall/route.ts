import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateQuery } from '@/lib/validate';
import { deleteTestimonail, deleteTestimonialSchema } from '@/lib/schemas/testimonial.schema';

export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        
        const WOF = searchParams.get('WOF');
        
        const isActiveBoolean = WOF === "true";
         const validation = validateQuery(deleteTestimonialSchema,searchParams)
                if (!validation.success) {
                    return NextResponse.json(
                        { error : 'Validation failed' },
                        { status: 400 }
                    );
                }
        
                const { testimonialId,spaceId} = validation.data as deleteTestimonail
        
        const updatedTestimonial = await prisma.testimonial.update({
            where: {
                id: testimonialId,
                spaceId:spaceId
            },
            data: {
                WOF: isActiveBoolean
            }
        });

        return NextResponse.json(updatedTestimonial, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error instanceof Error) ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}