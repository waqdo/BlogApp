'use client';

import { useState, useOptimistic } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema, CreatePostInput } from '@/lib/validations';
import { CREATE_POST } from '@/lib/graphql';
import { useAuth } from '@/contexts/AuthContext';

export default function PostForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
  });

  const [createPost] = useMutation(CREATE_POST);

  const onSubmit = async (data: CreatePostInput) => {
    if (!user) {
      setServerError('You must be logged in to create a post');
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const excerpt = data.body.substring(0, 200) + '...';

      await createPost({
        variables: {
          title: data.title,
          body: data.body,
          excerpt: excerpt,
          authorId: user.id,
          authorName: user.user_metadata?.full_name || user.email,
        },
      });

      reset();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error creating post:', error);
      setServerError(
        error instanceof Error ? error.message : 'Failed to create post'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {serverError}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Post Title *
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter post title"
          {...register('title')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
          Post Content *
        </label>
        <textarea
          id="body"
          placeholder="Write your post content here (supports markdown)..."
          rows={12}
          {...register('body')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
        )}
        <p className="mt-2 text-xs text-gray-500">Minimum 10 characters required</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Publishing...' : 'Publish Post'}
      </button>
    </form>
  );
}
