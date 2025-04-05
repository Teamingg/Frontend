import Link from "next/link";
import React from "react";

interface PostInfoProps {
  label: string;
  content: string;
  type?: "common" | "link";
}

const PostInfo = ({ label, content, type = "common" }: PostInfoProps) => {
  if (type === "common") {
    return (
      <p>
        <span className="text-gray-500 mr-4 text-sm md:text-base">{label}</span>
        <span className="text-sm md:text-base">{content}</span>
      </p>
    );
  } else if (type === "link") {
    return (
      <p>
        <span className="text-gray-500 mr-4">{label}</span>
        <Link
          href={content}
          target="_blank"
          className="underline hover:text-[#337CEB] transition-colors  text-sm md:text-base "
        >
          {content}
        </Link>
      </p>
    );
  }
};

export default PostInfo;
