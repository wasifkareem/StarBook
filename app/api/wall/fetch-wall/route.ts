import { prisma } from "@/lib/db";
import { spaceQuery, spaceQuerySchema } from "@/lib/schemas/space.schema";
import { validateQuery } from "@/lib/validate";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const validation = validateQuery(spaceQuerySchema,searchParams);

        if(!validation.success){
            return(
                NextResponse.json(
                    {error:'validation failed!!'},
                    {status:401}
                )
            )
        }

        const {spaceId} = validation.data as spaceQuery;

        const wall = await prisma.testimonial.findMany({
            where:{
                spaceId:spaceId
            }
        })
        return NextResponse.json(wall)
    } catch (error) {
        console.error('error fetching wall',error)
        return (
            NextResponse.json(
                {error:'Error fetching wall!!'},
                {status:400}
            )
        )
    }
}