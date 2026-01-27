"use client";

import { ApolloProvider } from "@apollo/client/react";
import { initializeApollo } from "@/lib/apolloClient";

const client = initializeApollo();

export default function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}