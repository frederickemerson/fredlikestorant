import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';

interface Post {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  content: string;
  createdAt: string,
  updatedAt: string,
}

export const GET = async (req: NextRequest) => {
    try {
      if (req.method !== 'GET') {
        return new NextResponse('Method not allowed', { status: 405 });
      }

      const posts: Post[] = await db.query.posts.findMany({
        orderBy: (model, {desc}) => desc(model.id)
      });
  
      return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (error) {
      console.error('Error fetching posts:', error);
      return new NextResponse('Internal server error', { status: 500 });
    }
  };