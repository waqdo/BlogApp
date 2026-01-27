import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byfxktwyuckoslrrnhwq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_n0qz5aNFtBXMEenKwNOC2w_tYY1nifQ';
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
  const { data, error } = await supabase.from('posts').insert([
    {
      title: 'First Post',
      body: 'This is the body of the first post.',
      excerpt: 'This is the excerpt of the first post.',
      author_name: 'John Doe',
    },
    {
      title: 'Second Post',
      body: 'This is the body of the second post.',
      excerpt: 'This is the excerpt of the second post.',
      author_name: 'Jane Smith',
    },
    {
      title: 'Third Post',
      body: 'This is the body of the third post.',
      excerpt: 'This is the excerpt of the third post.',
      author_name: 'Alice Johnson',
    },
  ]);

  if (error) {
    console.error('Error seeding database:', error);
  } else {
    console.log('Database seeded successfully:', data);
  }
}

seedDatabase();