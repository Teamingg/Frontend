import {client} from "@/service/api/instance/client";

export const withdrawUser = async () => {
  const response = await client.patch('/users/withdraw', null);
  const data = response.data;
  if (data.status !== 0) throw new Error(data.message || '회원탈퇴에 실패했습니다.');
  return data;
};