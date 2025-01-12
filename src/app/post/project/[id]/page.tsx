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

import PostHeader from "../../_components/PostHeader";
import PostInfo from "../../_components/PostInfo";
import PostButtonGroup from "../../_components/PostButtonGroup";

const ProjectPostPage = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast();
  const { modal, openModal, closeModal } = useModal();

  const { data } = useGetProjectPost(params.id);
  const { mutate, isSuccess } = useJoinProjectTeam();

  useEffect(() => {
    if (isSuccess) {
      queryclient.invalidateQueries({
        queryKey: ["project", "post", params.id],
      });
      toast.success("신청이 완료되었습니다.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (!data) {
    return null;
  }
  const handleClick = (e: MouseEvent) => {
    try {
      mutate({
        teamId: data.projectTeamId,
        recruitCategory: e.currentTarget.id,
      });

      queryclient.invalidateQueries({
        queryKey: ["project", "post", params.id],
      });
    } catch {}

    closeModal();
  };

  return (
    <>
      {/* 프로젝트 팀 지원 시 모집구분 선택하는 모달 */}
      {modal && (
        <Modal isOpen={modal} onClose={closeModal}>
          <div>
            <button className="flex items-center" onClick={closeModal}>
              <Image
                className=""
                src="/icons/backArrow.svg"
                width={6}
                height={6}
                alt="닫기 아이콘"
              />
              <span className="ml-2 text-primary">뒤로가기</span>
            </button>
            <p className="text-lg py-4">프로젝트 지원 분야를 선택해주세요.</p>
          </div>

          <ul className="space-y-4">
            {filterItemsByIds(data.recruitCategories, RECRUITE_CATEGORY).map(
              (item) => (
                <li key={item.value}>
                  <button
                    id={item.value}
                    onClick={handleClick}
                    className="w-full text-white bg-primary rounded-lg py-4"
                  >
                    {item.label}
                  </button>
                </li>
              )
            )}
          </ul>
        </Modal>
      )}
      <PostHeader
        title={data.title}
        teamName={data.teamName}
        deadLine={data.deadline}
        status={data.postStatus}
      />

      <div className="grid grid-cols-2 gap-4 bg-[#f5f5f5] p-6 rounded-lg">
        <PostInfo
          label="진행기간"
          content={`${data.startDate} ~ ${data.endDate}`}
        />
        <PostInfo label="모집인원" content={`${data.memberCnt}명`} />
        <PostInfo label="연락수단" content={data.link} type="link" />
        <PostInfo
          label="기술스택"
          content={filterItemsByIds(data.stacks, STACK_LIST)
            .map((value) => value.label)
            .join(",")}
        />
      </div>

      <p className="p-6">{data.contents}</p>

      {data.postStatus === "RECRUITING" && (
        <PostButtonGroup
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

export default ProjectPostPage;
