import {auth} from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';
import { comments } from '~/server/db/schema';
import { clerkClient } from '@clerk/nextjs/server';

interface RequestData{
    comment:string,
    linkId:string
}

export const POST = async (req: NextRequest) => {
    try {
        if (req.method !== 'POST') {
            return new NextResponse('Method not allowed', { status: 405 });
        }

        const data:RequestData = await req.json();
        if (!data.comment) {
            return new NextResponse('Comment is required', { status: 400 });
        }

        const id = auth().userId
        const userData = await clerkClient.users.getUser(id)
        const res = await db.insert(comments).values({name:userData.firstName,comment:data.comment,imageurl:userData.imageUrl,linkId:data.linkId})
        if(res){
            return new NextResponse('Store Success', { status: 200 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}
