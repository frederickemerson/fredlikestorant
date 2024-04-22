import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export interface BlogPost {
  id: number;
  title: string;
  publishDate: string;
  imageUrl: string;
  content: string;
}


export default async function HomePage() {

  const posts = await db.query.posts.findMany({
    orderBy: (model, {desc}) => desc(model.id)
  });


  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {
        posts.map((post,index) => (
          <div key={post.id} className="w-48"> 
            <img src={post.url} />
            <h1> {post.title} </h1>
          </div>
        ))
      }
      </div>
    </main>
  );
}
