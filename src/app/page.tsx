import Link from "next/link";
import { db } from "~/server/db";
export const dynamic = "force-dynamic";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "../components/ui/card"

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  content: string;
}


export default async function HomePage() {

  const posts = await db.query.posts.findMany({
    orderBy: (model, {desc}) => desc(model.id)
  });

  return (
    <main className="px-8 py-4">
      <div className="mb-12 ">
        <h1 className="text-6xl font-extrabold tracking-tight"> Fred Really Loves to Yap, Doesn't He?</h1>
        <p className="mt-4 text-lg text-gray-500"> Check Out, his latest rants below</p>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {
        posts.map((post,index) => (
          
            <Link key={post.slug}  href={"blogs/"+post.slug} >    
               <Card className="bg-gray-900 pt-4   border-0 rounded-xl shadow-2xl dark:bg-gray-1000">
                  <CardContent className=" flex flex-col justify-center items-center rounded-t-xl">
                   <img className="w-48" src={post.url} />
                  <CardTitle className="mt-2 text-white text-md">{post.title}</CardTitle>
                  </CardContent>
                </Card>
            </Link>

         
        ))
      }
      </div>
    </main>
  );
}
