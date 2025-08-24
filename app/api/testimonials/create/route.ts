import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { createTestimonialSchema } from '@/lib/schemas/testimonial.schema';





export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedBody = createTestimonialSchema.parse(body);

        const {
            imgPath,
            starRating,
            name,
            spaceId,
            email,
            WOF,
            testimonial,
            tip,
            title,
            xId,
            tweet,
            entities,
            likes,
            date,
            poster,
            video,
            twitterHandle,
            imgMedia,
        } = parsedBody;

        const mySpace = await prisma.space.findUnique({ where: { id: spaceId } });
        if (!mySpace) {
            return NextResponse.json({ error: 'No Space found!' }, { status: 400 });
        }

        const newTestimonial = await prisma.testimonial.create({
            data: {
                imgPath,
                starRating,
                name,
                spaceId,
                email,
                WOF,
                testimonial,
                tip,
                title,
                xId,
                tweet,
                entities,
                likes,
                date,
                poster,
                video,
                twitterHandle,
                imgMedia,
            },
        });

        return NextResponse.json(newTestimonial, { status: 200 });
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: err }, { status: 400 });
    }
}