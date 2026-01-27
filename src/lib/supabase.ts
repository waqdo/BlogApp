import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// GraphQL helper types
export interface BlogPost {
  id: string;
  title: string;
  body: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
}
