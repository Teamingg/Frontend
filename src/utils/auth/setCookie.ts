"use server";

import { cookies } from "next/headers";

export const setCookie = (key: string, value: string) => {
  return cookies().set(key, value);
};

export default setCookie;
