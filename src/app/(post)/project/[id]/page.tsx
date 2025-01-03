"use client";

import PostHeader from "../../_components/PostHeader";
import PostInfo from "../../_components/PostInfo";
import { useMutation, useQuery } from "@tanstack/react-query";
import getProjectPost from "@/service/api/project/post/getProjectPost";
import PostButtonGroup from "../../_components/PostButtonGroup";
import STACK_LIST from "@/constant/stackList";
import { instance } from "@/service/api/instance/axiosInstance";
import { MouseEvent, useState } from "react";
import Modal from "@/components/common/Modal/Modal";
import { RECRUITE_CATEGORY } from "@/constant/recruiteCategory";
import Image from "next/image";
import { filterItemsByIds } from "@/utils/filterItemsByIds";
import { queryclient } from "@/lib/getQueryClient";

const ProjectPostPage = ({ params }: { params: { id: string } }) => {
  const [modal, setModal] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["project", "post", params.id],
    queryFn: async () => await getProjectPost(params.id),
  });

  const { mutate } = useMutation({
    mutationFn: async (recruitCategory: string) => {
      await instance.post(`/project/join`, {
        teamId: data?.projectTeamId,
        recruitCategory: recruitCategory,
      });
    },
  });

  if (!data) {
    return null;
  }

  console.log(data.isMember);

  const handleClick = (e: MouseEvent) => {
    try {
      mutate(e.currentTarget.id);
      queryclient.invalidateQueries({
        queryKey: ["project", "post", params.id],
      });
    } catch {}

    setModal(false);
  };

  const CloseModal = () => {
    setModal(false);
  };

  return (
    <>
      {modal && (
        <Modal isOpen={modal} onClose={CloseModal}>
          <div>
            <button className="flex items-center" onClick={CloseModal}>
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

      <PostButtonGroup
        isEdit={data.isMember}
        teamId={data.projectTeamId}
        postType="project"
        onClick={() => setModal(true)}
      />
    </>
  );
};

export default ProjectPostPage;
