import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  createHttpLink,
} from '@apollo/client';
import { useMemo } from 'react';

let apolloClient: ApolloClient | undefined;

function createApolloClient() {
  const graphqlUrl = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL;
  const apikey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
console.log(apikey,'url')

  if (!graphqlUrl) {
    throw new Error(
      'Environment variable NEXT_PUBLIC_SUPABASE_GRAPHQL_URL is not set. Please define it in your .env.local file.'
    );
  }

  return new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: graphqlUrl,
    headers: {
      apikey: apikey || '',
      Authorization: `Bearer ${apikey}`,
    },
  }),
  cache: new InMemoryCache(),
});

}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Hydrate the cache with the initial state
  if (initialState) {
    const existingCache = _apolloClient.cache.extract();
    _apolloClient.cache.restore({
      ...(typeof existingCache === 'object' && existingCache !== null ? existingCache : {}),
      ...(typeof initialState === 'object' && initialState !== null ? initialState : {})
    });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState?: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
