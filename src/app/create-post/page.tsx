"use client";

import { useAuth } from '@/contexts/AuthContext';
import PostForm from '@/components/PostForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CreatePostPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, router]);

  if (!user) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
      <PostForm />
    </div>
  );
}