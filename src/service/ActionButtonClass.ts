import {ActionBtn} from "@/app/team/_components/MemberTableActionBtn";

export default class ActionButtonClass {
  static info(label: string, className: string): ActionBtn {
    return { type: "info", label, className };
  }

  static approve(onClick: () => void): ActionBtn {
    return { type: "approve", label: "수락", onClick };
  }

  static reject(onClick: () => void): ActionBtn {
    return { type: "reject", label: "거절", onClick };
  }

  static report(onClick: () => void): ActionBtn {
    return { type: "report", label: "신고", onClick };
  }

  static write(onClick: () => void): ActionBtn {
    return { type: "write", label: "작성", onClick };
  }

  static send(onClick: () => void): ActionBtn {
    return { type: "send", label: "내보내기", onClick };
  }

  static cancel(onClick: () => void): ActionBtn {
    return { type: "cancel", label: "전체 강퇴", onClick };
  }
}
