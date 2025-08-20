import { prisma } from "@/lib/db";
import { createSpaceSchema } from "@/lib/schemas/space.schema";
import { validateBody } from "@/lib/validate";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    try {
     const data = await request.json();
     
     const validation = validateBody(createSpaceSchema,data);
     if(!validation.success){
        return NextResponse.json(
            {error:'Validation failed, please check your Input!!'},
            {status:401}
        )
     }

     const newSpace = await prisma.space.create({
        data:data
     })

     return NextResponse.json(newSpace)
    
    } catch (error) {
        console.error(error)
        return(
            NextResponse.json(
                {error:"Couldn't create space"},
                {status:500}
            )
        )
    }
}