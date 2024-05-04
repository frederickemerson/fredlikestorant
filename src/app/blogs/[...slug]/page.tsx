import React from 'react'
import { db } from "~/server/db";
import { MDXRemote } from 'remote-mdx/rsc'
import Comments from '~/app/_components/Comments';

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
      <div className="flex flex-col items-center w-full h-screen px-12 py-6 ">
        <div className="flex flex-col pb-4 w-9/10 lg:w-1/2">
          <div className="flex flex-col mb-12">
            <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl xl:text-7xl">{blogpost?.title}</h1>
            <p className="align-right text-sm m-4 text-gray-500 dark:text-gray-400">Posted on {new Date(blogpost?.createdAt).toLocaleDateString()}</p>
          </div>
          <div className=" flex flex-col items-center border-indigo-300">
              <img
                alt="Cover image"
                className="aspect-video overflow-hidden rounded-lg object-cover mb-4 lg:mr-2"
                height={140}
                src={blogpost?.url}
                width={650}
              />
            <MDXRemote source={blogpost?.content} />
          </div>
        </div>
        <div className="mt-4 float-right md:fixed bottom-4 md:right-1 md:-translate-x-1/2 z-50  max-w-xs w-auto">
          <Comments blogId={params.slug[0]}/>
        </div>
      </div>
  )
}


