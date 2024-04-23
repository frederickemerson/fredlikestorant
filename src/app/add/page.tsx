import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { env } from "~/env";

export const dynamic = "force-dynamic";

export interface BlogPost {
  id: number;
  title: string;
  publishDate: string;
  imageUrl: string;
  content: string;
}

 function AddPost() {
  return (
    <div className="w-full max-h-screen flex flex-col justify-center items-center">
    <h1 className="text-3xl font-semibold text-white"> Welcome Back, Master</h1>
  </div>
  );
}

function RestrictedPage() {
  return(
    <div className="w-full max-h-screen flex flex-col justify-center items-center">
    <img src="https://utfs.io/f/df65328f-964d-4337-90d9-55cd748658d1-f0zjr3.png" width={400} height={400} />
    <h1 className="text-3xl font-semibold text-white"> Restricted Page!!!! Permission Denied</h1>
  </div>
  )
}

export default async function addPost() {
  
  const user = await auth();

  return(
    <div>
      <SignedIn>
        {((user.userId == env.MASTER_USER_ID)) ? <AddPost /> : <RestrictedPage />}
      </SignedIn>
      <SignedOut>
        <h1>Please Sign in</h1>
      </SignedOut>
    </div>
  )

}