import React from "react";

interface PostCardProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  tags?: string[];
  team: string;
}

const PostCard: React.FC<PostCardProps> = ({ ...rest }) => {
  const {title, description, startDate, endDate, tags, team} = rest;

  return (
    <article className="border rounded p-4 mb-4 shadow-sm">
      <p className="text-sm text-gray-500">{startDate} ~ {endDate}</p>
      <h3 className="text-lg font-bold mb-5">{title}</h3>
      <p className="text-sm text-gray-800 mb-4 line-clamp-3">{description}</p>
      <div className="flex justify-between items-center">
        {tags && tags.length > 0 && (
            <div className="text-xl text-gray-500 mb-2">{tags.join(", ")}</div>
        )}
        <p className="text-xs text-right text-blue-500">{team}</p>
      </div>
    </article>
  );
};

export default PostCard;
