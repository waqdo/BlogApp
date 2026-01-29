## Project Flow And Setups

Clone the repository

git clone https://github.com/waqdo/BlogApp.git
cd BlogApp


Install dependencies

npm install
# or
yarn install


Create environment variables

Create a file called .env.local in the root directory:

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://byfxktwyuckoslrrnhwq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_n0qz5aNFtBXMEenKwNOC2w_tYY1nifQ

# Optional: GraphQL endpoint (if using Supabase GraphQL API)
NEXT_PUBLIC_SUPABASE_GRAPHQL_URL=https://byfxktwyuckoslrrnhwq.supabase.co/graphql/v1

# NextAuth Configuration (optional, for password reset flows)
NEXTAUTH_SECRET=1234567890abcdef1234567890abcdef
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (if implementing Google Sign-in)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id



Never commit .env.local to GitHub.

Run the development server

npm run dev
# or
yarn dev


Open your browser:

http://localhost:3000

How to Link to a Supabase Project

Go to https://supabase.com

Create a new project

Navigate to Project Settings → API

Copy:

Project URL

Anon Public Key

GraphQL Endpoint

Paste them into .env.local as shown above.

Database & GraphQL

This project uses Supabase GraphQL for data fetching

Tables are accessed using postsCollection

Pagination is implemented using edges and pageInfo

Apollo Client is used for queries and mutations

Authentication Setup

Authentication is handled by Supabase Auth

Uses Anon Public Key for client-side access

Authorization headers are attached automatically in Apollo Client:

headers: {
  apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
}

Current Auth Behavior

Public read access enabled via Supabase Row Level Security (RLS)

Mutations require proper policies in Supabase

No password/session auth implemented yet (can be added later)

Tech Stack

Next.js (App Router)

React

Apollo Client

GraphQL

Supabase

TypeScript

Tailwind CSS

📄 Scripts
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Run production build





This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
