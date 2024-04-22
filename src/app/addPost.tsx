import { SignedIn } from "@clerk/nextjs";
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


export default async function addPost() {
  return (

  );
}
