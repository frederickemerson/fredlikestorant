import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '~/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { Skeleton } from '~/components/ui/skeleton'; // Importing the Skeleton component from shadcn

// Skeleton Card Component (for loading state using shadcn)
const SkeletonCard = () => (
  <Card className="flex flex-col bg-gray-900 text-white border-black">
    <Skeleton className="rounded-t-lg w-full pt-[56.25%] bg-gray-700" />
    <CardHeader>
      <Skeleton className="h-6 w-3/4 bg-gray-700 mb-2" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/3 bg-gray-700" />
        <Skeleton className="h-4 w-1/4 bg-gray-700" />
      </div>
    </CardHeader>
  </Card>
);

// Blog Posts Component
const BlogPosts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/getPosts'); // Replace with your API route
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  // Display skeleton cards while the posts are loading
  if (!posts) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  // Display actual posts after loading
  return (
  <section>
    <h2 className="text-3xl font-bold mb-6">Rants</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <Link key={post.slug} href={`/blogs/${post.slug}`}>
          <Card key={index} className="flex flex-col bg-gray-900 text-white border-black">
            <div className="overflow-hidden rounded-t-lg relative w-full pt-[56.25%]">
              <Image
                src={post.url}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
                className="rounded-t-lg hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{ new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                        })}
                  </span>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
    </section>
  );
};

export default BlogPosts;
