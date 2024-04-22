
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
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/4 p-4">
                    <h1 className="font-bold text-3xl mb-2">{blogpost?.title} </h1>
                    <p className="text-sm text-gray-600">Published on: {new Date(blogpost?.createdAt).toLocaleDateString()}</p>
                    <img src={blogpost?.url}/>
                    <p className="text-lg">
                        {blogpost?.content}
                    </p>
                </div>
               
            </div>
        </div>
  )
}


