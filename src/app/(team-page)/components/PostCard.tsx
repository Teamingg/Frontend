import React from "react";

interface PostCardProps {
  title: string;
  description: string;
  dateRange: string;
  tags: string[];
  team: string;
}

const PostCard: React.FC<PostCardProps> = (
  { title,
    description,
    dateRange,
    tags,
    team
  }) => {

  return (
    <article className="border rounded p-4 mb-4 shadow-sm">
      <p className="text-sm text-gray-500">{dateRange}</p>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-800 mb-4 line-clamp-3">{description}</p>
      <div className="text-sm text-gray-500 mb-2">{tags.join(", ")}</div>
      <p className="text-xs text-right text-blue-500">{team}</p>
    </article>
  );
};

export default PostCard;
