import {MemberStatus} from "@/app/team/_type/teamPageMember";
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