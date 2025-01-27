import {MemberStatus, MentoringTeamLeader, MentoringTeamMember, ProjectMember} from "@/app/team/_type/teamPageMember";
import {ActionBtn} from "@/app/team/_components/MemberTableActionBtn";
import ActionButtonClass from "@/app/team/_service/ActionButtonClass";

export const getActionConfig = (
    id: number,
    status: MemberStatus,
    isMember: boolean,
    updateFn: (id: number, key: keyof MemberStatus, value: boolean | null) => void
): ActionBtn[] => {
  if (isMember) {
    return [
      status.removed
          ? ActionButtonClass.info("강퇴", "text-red-500")
          : ActionButtonClass.send(() => updateFn(id, "removed", true)),

      status.reported
          ? ActionButtonClass.info("신고됨", "text-orange-500")
          : ActionButtonClass.report(() => updateFn(id, "reported", true)),

      status.written
          ? ActionButtonClass.info("작성 완료", "text-green-500")
          : ActionButtonClass.write(() => updateFn(id, "written", true))
    ];
  }

  const actions: ActionBtn[] = [
    status.approved === null
        ? ActionButtonClass.approve(() => updateFn(id, "approved", true))
        : status.approved
            ? ActionButtonClass.info("수락됨", "text-green-500")
            : ActionButtonClass.info("거절됨", "text-red-500")
  ];

  if (status.approved === null) {
    actions.push({ type: "reject", label: "거절", onClick: () => updateFn(id, "approved", false) });
  };

  return actions;
}

// ✅ 타입 가드 함수
export const isProjectMember = (data: unknown): data is ProjectMember[] => {
  return Array.isArray(data) && data.every(member => "participationId" in member);
};

export const isMentoringLeader = (data: unknown): data is MentoringTeamLeader => {
  return (data as MentoringTeamLeader)?.authority === "LEADER";
};

export const isMentoringMember = (data: unknown): data is MentoringTeamMember => {
  return (data as MentoringTeamMember)?.authority === "MEMBER";
};

// ✅ 데이터 변환 함수
export const transformTeamData = (
    data: MentoringTeamLeader | MentoringTeamMember | ProjectMember[] | undefined
): ProjectMember[] => {
  if (!data) return []; // 데이터가 없을 경우 빈 배열 반환

  if (isProjectMember(data)) {
    return data;
  } else if (isMentoringLeader(data)) {
    return data.details.members;
  } else if (isMentoringMember(data)) {
    return data.details;
  }

  return [];
};