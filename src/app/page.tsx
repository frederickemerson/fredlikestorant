import Link from "next/link";
import { db } from "~/server/db";
export const dynamic = "force-dynamic";
import { CardTitle, CardContent, Card } from "../components/ui/card"
import CurrentlyPlaying from "./_components/Spotify";
import NoSong from "./_components/NoSong";
import { Suspense } from "react";
import EmptyCard from "./_components/EmptyCard";
 
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
      
      <div className="flex flex-wrap gap-4  ">
      <Suspense fallback={ 
            <EmptyCard />
          }>
        {
        posts.map((post,index) => (
        
            <Link key={post.slug}  href={"blogs/"+post.slug} >    
               <Card className="bg-gray-900 pt-4   border-0 rounded-xl shadow-2xl dark:bg-gray-1000">
                  <CardContent className=" flex flex-col justify-center items-center rounded-t-xl">
                   <img className="w-48 h-48 rounded-lg" src={post.url} />
                  <CardTitle className="mt-2 text-white text-md">{post.title}</CardTitle>
                  </CardContent>
                </Card>
            </Link>
        ))
      }
      </Suspense>

      </div>

      <div className="mt-4 fixed bottom-4 left-1/2 -translate-x-1/2 z-50  max-w-xs w-auto">
        <Suspense fallback={<NoSong />} >
          <CurrentlyPlaying  />
        </Suspense>
      </div>
    </main>
  );
}
