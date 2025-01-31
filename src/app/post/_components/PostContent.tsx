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
    <>
      <PostHeader
        title={title}
        teamName={teamName}
        deadLine={deadline}
        status={postStatus}
      />

      <div className="grid grid-cols-2 gap-4 bg-[#f5f5f5] p-6 rounded-lg">
        {postInfo.map((info) => (
          <PostInfo
            key={info.label}
            label={info.label}
            content={info.content}
            type={info.type ? info.type : "common"}
          />
        ))}
      </div>

      <p className="p-6 max-h-[620px] overflow-y-scroll scrollbar-hide">
        {contents}
      </p>
    </>
  );
};

export default PostContent;
