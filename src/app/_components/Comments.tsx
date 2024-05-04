
import { Button } from "~/components/ui/button"
import { DrawerTrigger, DrawerContent, Drawer } from "~/components/ui/drawer"
import PostComment from './PostComment'
import { db } from "~/server/db";
import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar"

export default async function Comments({blogId}) {

  const comments = await db.query.comments.findMany({
    where: (model, {eq})=>eq(model.linkId,blogId),
    orderBy: (model, {desc}) => desc(model.c_id)
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button  className="rounded-full" >
          <span className="sr-only">Open Drawer</span>
          <svg
    className= "w-8 h-8"       
    xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill=""
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path xmlns="http://www.w3.org/2000/svg" d="M7.5 4h9c.62 0 1.17.02 1.66.09 2.63.29 3.34 1.53 3.34 4.91v6c0 3.38-.71 4.62-3.34 4.91-.49.07-1.04.09-1.66.09h-9c-.62 0-1.17-.02-1.66-.09C3.21 19.62 2.5 18.38 2.5 15V9c0-3.38.71-4.62 3.34-4.91C6.33 4.02 6.88 4 7.5 4ZM13.5 10H17M7 15.5h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path xmlns="http://www.w3.org/2000/svg" d="M10.095 10h.009M7.095 10h.009" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-screen p-4 ">
        <div className="grid gap-4">
          <div className="flex items-left justify-between mb-4">
              <div className="text-gray-800 font-semibold text-3xl">Comments</div>
            <PostComment blogId={blogId} />
          </div>
        </div>
        <div className="grid gap-4 text-black">
{          comments.map((comment,index)=>(

  <div key={comment.c_id} className="flex items-start gap-4">
    <Avatar className="h-10 w-10 shrink-0 border">
              <AvatarImage  src={comment.imageurl} />
              <AvatarFallback>{comment.name[0]}</AvatarFallback>
            </Avatar>
    <div className="space-y-2">
      <div className="flex flex-col items-start justify-between">
        <div className="font-medium"> {comment.name}</div>
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
      {comment.comment}
      </p>
      </div>

    </div>
  </div>

))
}       

 </div>
      </DrawerContent>
    </Drawer>
  )
}




