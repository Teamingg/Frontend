"use client";

import { MouseEvent, useEffect } from "react";

import Image from "next/image";

import STACK_LIST from "@/constant/stackList";
import { RECRUITE_CATEGORY } from "@/constant/recruiteCategory";

import { queryclient } from "@/lib/getQueryClient";
import { filterItemsByIds } from "@/utils/filterItemsByIds";

import useJoinProjectTeam from "@/hooks/team/project/useJoinProjectTeam";
import { useGetProjectPost } from "@/hooks/post/project/useGetProjectPost";
import { useToast } from "@/hooks/useToast";
import useModal from "@/hooks/useModal";

import Modal from "@/components/common/Modal/Modal";

import PostButtonGroup from "../../../_components/PostButtonGroup";
import PostContent from "@/app/post/_components/PostContent";

const ProjectPost = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const { modal, openModal, closeModal } = useModal();

  const { data, isFetching } = useGetProjectPost(id);
  const { mutate, isSuccess } = useJoinProjectTeam();

  // 신청이 완료됐을 때
  useEffect(() => {
    if (isSuccess) {
      queryclient.invalidateQueries({
        queryKey: ["project", "post", data?.projectTeamId, id],
      });
      toast.success("신청이 완료되었습니다.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleClick = (e: MouseEvent) => {
    try {
      mutate({
        teamId: data!.projectTeamId,
        recruitCategory: e.currentTarget.id,
      });

      queryclient.invalidateQueries({
        queryKey: ["project", "post", id],
      });
    } catch {
      toast.error("잠시 후 다시 시도해주세요.");
    }

    closeModal();
  };

  if (!data) {
    return null;
  }

  const postInfo = [
    {
      label: "진행기간",
      content: `${data.startDate} ~ ${data.endDate}`,
    },
    {
      label: "모집인원",
      content: `${data.memberCnt}명`,
    },
    {
      label: "연락수단",
      content: data.link,
      type: "link" as const,
    },
    {
      label: "기술스택",
      content: filterItemsByIds(data.stacks, STACK_LIST)
        .map((value) => value.label)
        .join(","),
    },
  ];

  return (
    <>
      {/* 프로젝트 팀 지원 시 모집구분 선택하는 모달 */}
      {modal && (
        <Modal isOpen={modal} onClose={closeModal}>
          <div>
            <button className="flex items-center" onClick={closeModal}>
              <Image
                src="/icons/backArrow.svg"
                width={6}
                height={6}
                alt="닫기 아이콘"
              />
              <span className="ml-2 text-primary">뒤로가기</span>
            </button>
            <h3 className="py-2 text-xl text-center">지원분야</h3>
            <p className="text-lg mb-4 text-gray-500">
              프로젝트 팀에 지원하고자 하는 분야를 선택해주세요.
            </p>
          </div>

          <ul className="space-y-4">
            {filterItemsByIds(data.recruitCategories, RECRUITE_CATEGORY).map(
              (item) => (
                <li key={item.value}>
                  <button
                    id={item.value}
                    onClick={handleClick}
                    className="w-full text-white bg-primary rounded-lg py-4 hover:bg-opacity-90 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              )
            )}
          </ul>
        </Modal>
      )}
      {
        <PostContent
          teamName={data.teamName}
          title={data.teamName}
          deadline={data.deadline}
          postStatus={data.postStatus}
          contents={data.contents}
          postInfo={postInfo}
        />
      }

      {data.postStatus === "RECRUITING" && (
        <PostButtonGroup
          isfetch={isFetching}
          isApply={data.isApply}
          isEdit={data.isMember}
          teamId={data.projectTeamId}
          postType="project"
          action={openModal}
          boardId={data.postId}
        />
      )}
    </>
  );
};

export default ProjectPost;
