import React from "react";

const PostCard = ({post}) => {
  return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition p-4">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <span className={`px-2 py-1 text-xs font-semibold rounded ${
            post.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"}`}>
          {post.status === "active" ? "활성" : "대기중"}
        </span>
          <span>{post.date}</span>
        </div>

        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <div className="text-xs text-gray-500 flex gap-3 mb-2">
          <span>조회 {post.views}</span>
          <span>지원 {post.applies}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {(post.tags ?? []).map((tag, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">{tag}</span>
            ))}
          </div>
          <div className="flex gap-2 text-gray-500">
            <button className="hover:text-blue-600">수정</button>
            <button className="hover:text-red-600">삭제</button>
          </div>
        </div>
      </div>
  );
};

export default PostCard;