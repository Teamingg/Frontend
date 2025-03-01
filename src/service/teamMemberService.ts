import {MemberStatus, MentoringMemberResponse, ProjectMember} from "@/types/team/teamPageMember";
import {ActionBtn} from "@/app/team/_components/MemberTableActionBtn";
import ActionButtonClass from "@/service/ActionButtonClass";
import {isMentoringMember, isProjectMember} from "@/service/teamTypeGuard";
import {SelectedAction} from "@/app/team/_components/MemberTables";

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

// ✅ 엔드포인트 매핑 함수
export const getMemberActionEndpoint = (
    pageType: string,
    teamId: string,
    userId: number,
    action: keyof MemberStatus
): string => {
  const baseUrl = `/${pageType}/team/${teamId}/${userId}`;
  const endpointMap: Record<keyof MemberStatus, string> = {
    approved: `${baseUrl}/accept`, // 수락
    removed: `${baseUrl}/export`,  // 내보내기
    reported: `${baseUrl}/reject`, // 거절
    written: `${baseUrl}/write`,   // 작성 완료 (현재 필요 없음)
  };
  return endpointMap[action];
};

export const initializeMemberStatus = (data: ProjectMember[]): Record<number, MemberStatus> => {
  const initialStatus: MemberStatus = {
    approved: null,
    removed: false,
    reported: false,
    written: false,
  };

  return data.reduce((acc, member) => {
    acc[member.userId] = { ...initialStatus };
    return acc;
  }, {} as Record<number, MemberStatus>);
};

export const getSelectedAction = (
    id: number,
    key: keyof MemberStatus,
    name: string,
    value: boolean | null
): SelectedAction => {
  const actionLabels: Record<keyof MemberStatus, string> = {
    approved: "승인",
    removed: "강퇴",
    reported: "신고",
    written: "작성 완료",
  };

  return {
    id,
    key,
    name,
    value,
    label: actionLabels[key] || key,
  };
};

export const updateMemberStatusState = (
    prevState: Record<number, MemberStatus>,
    selectedAction: SelectedAction
): Record<number, MemberStatus> => {
  return {
    ...prevState,
    [selectedAction.id]: {
      ...prevState[selectedAction.id],
      [selectedAction.key]: selectedAction.value,
    },
  };
};