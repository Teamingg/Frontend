import { useToastStore } from "../store/useToastStore";

export const useToast = () => {
  const toastList = useToastStore((state) => state.toastList);
  const { openToast, closeToast } = useToastStore((state) => state.action);

  const toast = {
    success: (message: string) => {
      openToast({ type: "success", message });
    },
    error: (message: string) => {
      openToast({ type: "error", message });
    },
    notice: (message: string) => {
      openToast({ type: "notice", message });
    },
  };

  return {
    toastList,
    toast,
    closeToast,
  };
};
