
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
      <div className="flex flex-col w-full h-screen px-12 py-6 ">
        <div className="flex flex-col">
          <div className="flex flex-col mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl">{blogpost?.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Posted on {new Date(blogpost?.createdAt).toLocaleDateString()}</p>
          </div>
          <div className=" border-indigo-300">
              <img
                alt="Cover image"
                className="aspect-video overflow-hidden rounded-lg object-cover mb-4 lg:mr-2"
                height={140}
                src={blogpost?.url}
                width={650}
                align="left"
              />
            <p>
              {blogpost?.content}
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div>
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl xl:text-5xl">Comments</h1>
          </div>
        </div>
      </div>
  )
}


