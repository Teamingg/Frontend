import React from "react";
import PostHeader from "./PostHeader";
import PostInfo from "./PostInfo";
import { TeamStatus } from "@/types/team/teamStatus";

interface PostInformation {
  label: string;
  content: string;
  type?: "common" | "link";
}

interface PostContentProps {
  title: string;
  teamName: string;
  deadline: string;
  postStatus: TeamStatus;
  postInfo: PostInformation[];
  contents: string;
}

const PostContent = ({
  title,
  teamName,
  deadline,
  postStatus,
  contents,
  postInfo,
}: PostContentProps) => {
  return (
    <article content='lg:w-2/3'>
      <PostHeader
        title={title}
        teamName={teamName}
        deadLine={deadline}
        status={postStatus}/>

      <div className="flex flex-col gap-2 md:gap-4 bg-[#f5f5f5] p-4 md:p-6 rounded-lg text-xs md:text-base md:grid md:grid-cols-2 mb-5">
        {postInfo.map((info) => (
          <PostInfo
            key={info.label}
            label={info.label}
            content={info.content}
            type={info.type ? info.type : "common"}/>
        ))}
      </div>

      <p className="p-4 text-base md:text-lg max-h-[480px] overflow-y-scroll scrollbar-hide">
        {contents}
      </p>
    </article>
  );
};

export default PostContent;