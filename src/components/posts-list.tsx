import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

interface Author {
  id: string;
  name: string;
  email: string;
}

interface Post {
  title: string;
  author: Author;
}

interface PublishedPostsData {
  publishedPosts: Post[];
}

const GET_PUBLISHED_POSTS = gql`
  query {
    publishedPosts {
      title
      author {
        id
        name
        email
      }
    }
  }
`;

export const PostsList: React.FC = () => {
  const { loading, data } = useQuery<PublishedPostsData>(GET_PUBLISHED_POSTS);
  return (
    <div>
      <h3>Posts</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {data &&
            data.publishedPosts.map((post: Post) => (
              <div>
                <div>{post.title}</div>
                <div>{post.author.name}</div>
                <div>{post.author.email}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
