'use client';

import { useQuery } from '@apollo/client/react';
import { GET_POST_BY_ID } from '@/lib/graphql';
import { useParams } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  body: string;
  authorName: string;
  createdAt: string;
}

interface GetPostByIdData {
  postsCollection: {
    edges: { node: Post }[];
  };
}

export default function PostDetails() {
  const params = useParams();
  const id = params?.id as string;

  const { data, loading, error } = useQuery<GetPostByIdData>(
    GET_POST_BY_ID,
    {
      variables: { id },
      skip: !id,
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post.${error.message}</p>;

  const post = data?.postsCollection?.edges[0]?.node;

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        By {post.authorName} on{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">{post.body}</div>
    </div>
  );
}
