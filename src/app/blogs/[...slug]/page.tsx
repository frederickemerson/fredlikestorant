
import React from 'react'
import { db } from "~/server/db";

interface props{
    params:{
        slug:string[],
    }
}


export default async function Post({params} : props) {

    const blogpost = await db.query.posts.findFirst({
        where: (model, {eq})=>eq(model.slug,params.slug[0])
    })

  return (
      <div className="px-12 py-8 flex flex-col min-h-screen space-y-12 md:space-y-24 lg:space-y-32">
        <main className="grid gap-4 md:gap-10 lg:gap-20 xl:gap-16 min-w-[0] flex-1">
          <div className="grid">
            <h1 className="text-6xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl">{blogpost?.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Posted on {new Date(blogpost?.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="grid gap-4">
              <img
                alt="Cover image"
                className="aspect-video overflow-hidden rounded-lg object-cover"
                height={140}
                src={blogpost?.url}
                width={850}
              />
          </div>
          <div className="grid gap-2">
            <p>
              {blogpost?.content}
            </p>
          </div>
        </main>
      </div>
  )
}


