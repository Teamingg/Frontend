import { create } from "zustand";

type ToastType = "success" | "error" | "notice";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastStore {
  toastList: ToastItem[];
  action: {
    openToast: ({
      type,
      message,
    }: {
      type: ToastType;
      message: string;
    }) => void;
    closeToast: (id: string) => void;
  };
}

export const useToastStore = create<ToastStore>((set, get) => {
  return {
    toastList: [],
    action: {
      openToast({ type, message }) {
        set((state) => ({
          toastList: [
            ...state.toastList,
            {
              type,
              message,
              id: String(Math.random()),
            },
          ],
        }));
      },
      closeToast(id) {
        set((state) => ({
          toastList: state.toastList.filter((toast) => toast.id !== id),
        }));
      },
    },
  };
});
