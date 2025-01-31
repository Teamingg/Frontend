"use server";

import { cookies } from "next/headers";

export const checkCookie = (key: string) => {
  return cookies().has(key);
};

export const getCookie = (key: string) => {
  return cookies().get(key)?.value;
};

export const setCookie = (key: string, value: string) => {
  cookies().set(key, value);
};

export const removeCookie = (key: string) => {
  return cookies().delete(key);
};
