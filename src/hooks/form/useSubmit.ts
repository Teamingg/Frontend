import {instance} from "@/service/api/instance/axiosInstance";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";

interface Props<T> {
  endpoint: string;
  formatPayload: (formData: T) => object;
  onSuccess?: (data: T) => void;
}

export const useSubmit = <T, >({
  endpoint,
  formatPayload,
  onSuccess
}: Props<T>) => {
  const mutation = useMutation({
    mutationFn: async (formData: T) => {
      const payload = formatPayload(formData);
      const response = await instance.post(endpoint, payload);
      return response.data;
    },
    onSuccess,
    onError: (e: unknown) => {
      if (e instanceof AxiosError) {
        console.error("❌ Axios Error:", e.response?.data?.message || e.message);
      } else {
        console.error("❌ Unexpected Error:", e);
      }
    },
  });

  return {
    submit: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};