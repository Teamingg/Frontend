import React from 'react';

interface MemberTblActionBtn {
  type: "approve" | "reject" | "report" | "write" | "send" | "cancel";
  label: string;
  onClick: () => void;
}

interface Props {
  actions: MemberTblActionBtn[];
}

const MemberTableActionBtn: React.FC<Props> = ({ actions }) => {
  /*
   * approve : 수락
   * reject : 거절
   * report : 신고
   * write : 작성
   * send : 내보내기
   * cancel : 전체 강퇴
   */
  const buttonStyles = {
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
        <button
          key={index}
          className={buttonStyles[action.type]}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ))}
    </>
  );
};

export default MemberTableActionBtn;
