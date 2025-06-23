export default class ActionButtonClass {
  static info(label: string, className: string): ActionButtonClass {
    return { type: "info", label, className };
  }

  static approve(onClick: () => void): ActionButtonClass {
    return { type: "approve", label: "수락", onClick };
  }

  static reject(onClick: () => void): ActionButtonClass {
    return { type: "reject", label: "거절", onClick };
  }

  static report(onClick: () => void): ActionButtonClass {
    return { type: "report", label: "신고", onClick };
  }

  static write(onClick: () => void): ActionButtonClass {
    return { type: "write", label: "작성", onClick };
  }

  static send(onClick: () => void): ActionButtonClass {
    return { type: "send", label: "내보내기", onClick };
  }

  static cancel(onClick: () => void): ActionButtonClass {
    return { type: "cancel", label: "전체 강퇴", onClick };
  }
}
