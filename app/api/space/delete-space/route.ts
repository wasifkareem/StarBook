import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    try {
        const { userId } = await auth();
        
        if(!userId){
            return NextResponse.json(
                {error:'Unauthorized'},
                {status:401}
            )
        }

        const {searchParams} = new URL(request.url);
        const spaceId = searchParams.get('spaceId');
        const userEmail = searchParams.get('userEmail')

        if(!spaceId){
            return NextResponse.json(
                {error:'SpaceId required!'},
                {status:400}
            )
        }

        if(!userEmail){
            return NextResponse.json(
                {error:'User not found!!'},
                {status:400}
            )
        }

        const space  = await prisma.space.findFirst({
            where:{
                id:spaceId,
                ownerEmail:userEmail
            }
        })

        if(!space){
            return NextResponse.json(
                {error:"Space not found!!"},
                {status:404}
            )
        }

        const deletedSpace  =await prisma.space.delete({
            where:{id:spaceId}
        })

        return NextResponse.json({
            message:'space deleted successfully',
            deletedSpace
        })
    } catch (error) {
        console.error('Delete err', error)
    }
}