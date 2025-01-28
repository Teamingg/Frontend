import {MemberStatus, MentoringMemberResponse, ProjectMember} from "@/app/team/_type/teamPageMember";
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
// ✅ 프로젝트 멤버인지 확인
export const isProjectMember = (data: unknown): data is ProjectMember[] => {
  return Array.isArray(data) && data.every(member => "participationId" in member);
};

// ✅ 멘토링 멤버인지 확인 (리더 or 일반 멤버)
export const isMentoringMember = (data: unknown): data is MentoringMemberResponse => {
  return typeof data === "object" && data !== null && "authority" in data;
};

// ✅ 데이터 변환 함수
export const transformTeamData = (
    data: MentoringMemberResponse | ProjectMember[] | undefined
): ProjectMember[] => {
  // ✅ 데이터가 없는경우 빈 배열 반환
  if (!data) return [];

  // ✅ 프로젝트 데이터 그대로 반환
  if (isProjectMember(data)) return data;

  if (isMentoringMember(data)) {
    const details = (data as MentoringMemberResponse).details;

    // ✅ `details`가 객체인지 확인 후 `members`에 접근
    const hasNoDetails = !("details" in data) || typeof data.details !== "object";
    const hasNoMembersArray = !Array.isArray(data.details.members);
    if (hasNoDetails || hasNoMembersArray) return [];

    return details.members.map(member => ({
      type: "PROJECT",
      userId: member.userId,
      userName: member.username,
      username: member.username,
      role: member.role,
      participationId: 0,
      projectTeamId: 0,
      participationStatus: member.status,
      recruitCategory: "N/A",
      decisionDate: member.acceptedTime,
      acceptedTime: member.acceptedTime,
      reportingCnt: 0,
      isDeleted: member.isDeleted,
      isExport: false,
      isLoginUser: member.isLogined,
      isReported: false,
      isReviewed: false,
    }));
  }

  return [];
};
