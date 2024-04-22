import Link from "next/link";

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  imageUrl: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
      id: 1,
      title: "Introduction to TypeScript",
      author: "Jane Doe",
      publishDate: "2024-04-01",
      imageUrl: "https://utfs.io/f/45520d98-7fbf-4ee6-ab4a-c78cf48923a5-1rd87u.jpg",
      content: "TypeScript extends JavaScript by adding types to the language. TypeScript speeds up your development experience by catching errors and providing fixes before you even run your code."
  },
  {
      id: 2,
      title: "Advanced TypeScript Features",
      author: "John Smith",
      publishDate: "2024-04-10",
      imageUrl: "https://utfs.io/f/45520d98-7fbf-4ee6-ab4a-c78cf48923a5-1rd87u.jpg",
      content: "In this post, we will explore some advanced features of TypeScript including generics, utility types, and conditional types."
  },
  {
      id: 3,
      title: "Handling State in React with TypeScript",
      author: "Alice Johnson",
      publishDate: "2024-04-15",
      imageUrl: "https://utfs.io/f/45520d98-7fbf-4ee6-ab4a-c78cf48923a5-1rd87u.jpg",
      content: "Learn how to manage state in your React applications effectively using TypeScript to enhance your code's reliability and maintainability."
  }
];

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {
        [...blogPosts,...blogPosts,...blogPosts].map((post,index) => (
          <div key={post.id} className="w-48"> 
            <img src={post.imageUrl} />
            <h1> {post.title} </h1>
          </div>
        ))
      }
      </div>
    </main>
  );
}
