// BlogPost.tsx
import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { db } from "~/server/db";
import Comments from '~/app/_components/Comments';
import Curve from '~/app/_components/Curve';
import { env } from '~/env';


  
// MDX components definition
const mdxComponents = {
  h1: ({ children, ...props }) => (
    <h1 {...props} className="text-4xl font-bold mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 {...props} className="text-3xl font-bold mt-6 mb-3">{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="text-2xl font-bold mt-5 mb-2">{children}</h3>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className="text-lg leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="list-disc list-inside mb-4 space-y-2">{children}</ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="text-lg">{children}</li>
  ),
  a: ({ children, ...props }) => (
    <a {...props} className="text-blue-400 hover:text-blue-300 underline">{children}</a>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote {...props} className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
  ),
  code: ({ children, ...props }) => (
    <code {...props} className="bg-gray-800 rounded px-2 py-1">{children}</code>
  ),
  pre: ({ children, ...props }) => (
    <pre {...props} className="bg-gray-800 rounded p-4 my-4 overflow-x-auto">{children}</pre>
  ),
};

// Data fetching function
async function getBlogPost(slug: string) {
  const blogpost = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.slug, slug)
  });

  if (!blogpost) {
    return null;
  }

  const content = await fetch(env.STORAGE_ACCESS + blogpost.contenturl).then(res => res.text());
  
  return {
    blogpost,
    content
  };
}

// Main component
export default async function Post({ params }: { params: { slug: string[] } }) {
  const data = await getBlogPost(params.slug[0]);
  
  if (!data) {
    return <div>Post not found</div>;
  }

  const { blogpost, content } = data;

  return (
    <Curve routeName={blogpost.title}>
      <div className="flex flex-col items-center w-full min-h-screen px-4 md:px-12 py-6 bg-[#02182c]">
        <article className="prose prose-invert lg:prose-xl max-w-none w-full lg:w-1/2">
          <div className="flex flex-col mb-12">
            <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl xl:text-7xl">
              {blogpost.title}
            </h1>
            <p className="text-sm mt-4 text-gray-500">
              Posted on {new Date(blogpost.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <img
              alt="Cover image"
              className="aspect-video w-full rounded-lg object-cover mb-8"
              src={env.STORAGE_ACCESS + blogpost.url}
            />
            <div className="w-full">
              <MDXRemote 
                source={content} 
                components={mdxComponents}
              />
            </div>
          </div>
        </article>
        
        <div className="mt-8 md:fixed bottom-4 right-4 z-50 max-w-xs w-auto">
          <Comments blogId={params.slug[0]} />
        </div>
      </div>
    </Curve>
  );
}