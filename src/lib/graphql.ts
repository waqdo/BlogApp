import { gql } from '@apollo/client';

export const GET_PAGINATED_POSTS = gql`
  query GetPaginatedPosts($limit: Int!, $after: String) {
    postsCollection(first: $limit, after: $after) {
      edges {
        cursor
        node {
          id
          title
          body
          excerpt
          authorName
          createdAt
          published
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;


export const GET_POST_BY_ID = gql`
  query GetPostById($id: UUID!) {
    postsCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          title
          body
          authorName
          
          createdAt
          
          published
        }
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $body: String!
    $excerpt: String!
    $authorId: UUID!
    $authorName: String!
  ) {
    insertIntopostsCollection(
      objects: {
        title: $title
        body: $body
        excerpt: $excerpt
        authorName: $authorName
        published: true
      }
    ) {
      records {
        id
        title
        body
        excerpt
        authorName
        createdAt
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    postsCollection {
      edges {
        node {
          id
          title
          body
          excerpt
          authorName
          createdAt
          published
        }
      }
    }
  }
`;
