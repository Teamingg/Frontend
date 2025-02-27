"use server";

import {cookies} from "next/headers";

export const checkCookie = async (key: string) => {
  return (await cookies()).has(key);
};

export const getCookie = async (key: string) => {
  return (await cookies()).get(key)?.value;
};

export const setCookie = async (key: string, value: string) => {
  (await cookies()).set(key, value);
};

export const removeCookie = async (key: string) => {
  return (await cookies()).delete(key);
};