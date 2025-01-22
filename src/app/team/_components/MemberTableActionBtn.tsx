import React from 'react';

interface Common {
  label: string;
  className?: string;
  onClick?: () => void;
}

interface ClickableAction extends Common {
  type: "approve" | "reject" | "report" | "write" | "send" | "cancel";
}

interface InfoAction extends Common {
  type: "info";
}

export type ActionBtn = ClickableAction | InfoAction;

interface Props {
  actions: ActionBtn[];
}

const MemberTableActionBtn: React.FC<Props> = ({actions}) => {
  /*
   * ✅ approve : 수락
   * ✅ reject : 거절
   * ✅ report : 신고
   * ✅ write : 작성
   * ✅ send : 내보내기
   * ✅ cancel : 전체 강퇴
   */
  const buttonStyles: Record<ClickableAction["type"], string> = {
    approve: 'bg-blue-500 text-white px-2 py-1 rounded text-xs mr-2',
    reject: 'bg-red-500 text-white px-2 py-1 rounded text-xs',
    report: 'bg-red-500 text-white px-2 py-1 rounded text-xs',
    write: 'bg-yellow-400 text-white px-2 py-1 rounded text-xs',
    send: 'bg-blue-500 text-white px-2 py-1 rounded text-xs',
    cancel: 'bg-red-500 text-white px-2 py-1 rounded text-xs',
  };

  return (
      <>
        {actions.map((action, index) => (
            action.type === "info" ? (
                <span key={index} className={action.className}>
            {action.label}
          </span>
            ) : (
                // ✅ `info`는 버튼 스타일을 참조하지 않음
                // ✅ `info`는 onClick 이 없음
                <button
                    key={index}
                    className={buttonStyles[action.type]}
                    onClick={action.onClick}
                >
                  {action.label}
                </button>
            )
        ))}
      </>
  );
};

export default MemberTableActionBtn;
