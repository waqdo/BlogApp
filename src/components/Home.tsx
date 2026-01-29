"use client";

import { useQuery } from "@apollo/client/react";
import { GET_PAGINATED_POSTS } from "@/lib/graphql";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface PostsQueryData {
  postsCollection: {
    edges: { node: any }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

const buttonHover = {
  scale: 1.1,
  transition: { duration: 0.3 },
};

export default function Home() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data, loading, error } = useQuery<PostsQueryData>(
    GET_PAGINATED_POSTS,
    {
      variables: {
        limit: 5,
        after: searchParams.get("after") || null,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  const posts =
    data?.postsCollection?.edges.map((edge) => edge.node) || [];
  const hasNextPage = data?.postsCollection?.pageInfo?.hasNextPage;
  const endCursor = data?.postsCollection?.pageInfo?.endCursor;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <motion.main
        className="w-full max-w-4xl py-32 px-16 bg-white dark:bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to the Next World Blog App
        </h1>

        <div className="flex justify-center mb-8">
          <motion.div whileHover={buttonHover}>
            <Link href="/create-post">
              <p className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                Create a Post
              </p>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          hasNextPage={hasNextPage ?? false}
          endCursor={endCursor}
        />
      </motion.main>
    </div>
  );
}
