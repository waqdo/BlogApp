'use client';

import Link from 'next/link';
import { BlogPost } from '@/lib/supabase';
import { formatDate, getReadingTime } from '@/lib/blogHelpers';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const readingTime = getReadingTime(post.body);

  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300 hover:border-gray-300">
      <Link href={`/posts/${post.id}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition dark:text-white">
          {post.title}
        </h2>
      </Link>

      <p className="text-gray-600 mb-4 line-clamp-3 dark:text-gray-300">{post.excerpt}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex gap-4">
          <span>{formatDate(post.createdAt)}</span>
          <span>{readingTime} min read</span>
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-300">{post.authorName}</span>
      </div>
    </article>
  );
}
