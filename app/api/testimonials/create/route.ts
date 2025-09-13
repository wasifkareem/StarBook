import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { createTestimonialSchema } from '@/lib/schemas/testimonial.schema';
import { auth, clerkClient } from '@clerk/nextjs/server';


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedBody = createTestimonialSchema.parse(body);
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json(
                {error:'Unauthorized'},
                {status:403}
            )
        }
        const client  = await clerkClient();
        const user = client.users.getUser(userId);
        const isPro = (await user).privateMetadata.pro===true;
        const maxTestimonails = isPro?25:7
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
        const testimonailsList = await prisma.testimonial.findMany({
            where:{spaceId:spaceId}
        })

        if(testimonailsList.length>=maxTestimonails){
            return NextResponse.json(
                {error:`Max testimonails limit reached:${maxTestimonails}`},
                {status:401}
            )
        }
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