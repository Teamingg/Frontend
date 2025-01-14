"use client";

import useModal from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { queryclient } from "@/lib/getQueryClient";
import { instance } from "@/service/api/instance/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import AlertModal from "./common/Modal/AlertModal";

interface CancelJoinButtonProps {
  children: React.ReactNode;
  category: "project" | "mentoring";
  teamId: number;
  boardId: number;
}

const CancelJoinButton = ({
  children,
  category,
  teamId,
  boardId,
}: CancelJoinButtonProps) => {
  const { modal, openModal, closeModal } = useModal();
  const { toast } = useToast();

  const url =
    category === "project"
      ? `/project/join/${teamId}/cancel`
      : `mentoring/teams/${teamId}/participants`;

  const { mutate } = useMutation({
    mutationFn: async () => {
      await instance.delete(url);
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: [category, "post", boardId.toString()],
      });
      closeModal();
      toast.success("지원이 취소되었습니다.");
    },
  });

  const onClick = () => {
    mutate();
  };

  return (
    <>
      {modal && (
        <AlertModal
          title="지원취소"
          onClose={closeModal}
          isOpen={modal}
          message="해당 팀에 대한 지원을 정말로 취소 하시겠습니까?"
          buttonLabel="네"
          ConfirmButonColor="bg-red-400"
          onConfirm={() => mutate()}
        />
      )}
      <button
        className="py-4 w-full bg-red-400 text-white rounded-lg text-center"
        onClick={openModal}
      >
        {children}
      </button>
    </>
  );
};

export default CancelJoinButton;
