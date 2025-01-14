import React from "react";
import PostCard from "./PostCard";

interface Post {
  id: number;
  title: string;
  description: string;
  dateRange: string;
  tags: string[];
  team: string;
}

interface PostListProps {
  posts: Post[];
  onLoadMore: () => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onLoadMore }) => {
  return (
    <div>
      <div>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            description={post.description}
            dateRange={post.dateRange}
            tags={post.tags}
            team={post.team}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={onLoadMore}
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >
          더보기
        </button>
      </div>
    </div>
  );
};

export default PostList;
