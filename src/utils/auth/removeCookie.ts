"use server";

import { cookies } from "next/headers";

export const removeCookie = (key: string) => {
  return cookies().delete(key);
};
export default removeCookie;
