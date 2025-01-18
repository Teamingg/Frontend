import React from 'react';
import PostCard from "@/app/(team-page)/[page_type]/[team_id]/(member)/post/_components/PostCard";
import PostSeeMoreBtn from "@/app/(team-page)/[page_type]/[team_id]/(member)/post/_components/PostSeeMoreBtn";

interface PostPageContainerProps {
  data: any;
  children: React.ReactNode;
}

const PostPageContainer = ({data, children}: PostPageContainerProps) => {
  return (
    <>
      {/* 게시물이 존재한다면 출력, 없다면 X */}
      {data === null || data === undefined || data.langth === 0 ? (
        <div className="text-center">게시물이 없습니다.</div>
      ) : (
        <>
          {/* contents */}
          <PostCard
            title={"title"}
            description={"description"}
            startDate={"startDate"}
            endDate={"endDate"}
            tags={["tags"]}
            team={"team"}
          />
          {children}

          {/* 더보기 버튼 */}
          <PostSeeMoreBtn/>
        </>
      )}
    </>
  );
};

export default PostPageContainer;