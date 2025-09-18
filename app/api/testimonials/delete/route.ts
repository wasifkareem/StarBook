import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateQuery } from '@/lib/validate';
import {
  deleteTestimonail,
  deleteTestimonialSchema,
} from '@/lib/schemas/testimonial.schema';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const validation = validateQuery(deleteTestimonialSchema, searchParams);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    const { spaceId, testimonialId } = validation.data as deleteTestimonail;

    if (!spaceId || !testimonialId) {
      return NextResponse.json(
        { error: 'spaceId and testimonialId are required' },
        { status: 400 }
      );
    }

    await prisma.testimonial.delete({
      where: {
        id: testimonialId,
        spaceId: spaceId,
      },
    });

    return NextResponse.json('Testimonail deleted successfully!', {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
