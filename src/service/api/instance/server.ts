"use server";

import axios, { AxiosError } from "axios";
import { defaultInstanceOptions } from "./defaultInstance";
import { cookies } from "next/headers";
import handleError from "@/service/handleError";

export async function createServerInstance() {
  const cookieStore = await cookies();
  const instance = axios.create({
    ...defaultInstanceOptions,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => await onResponse(error)
  );

  return instance;
}

async function onResponse(
  error: AxiosError<{ status: number; message: string }>
) {
  const errorCode = error.response?.data.status;
  let errorMessage;
  try {
    handleError(errorCode);
  } catch (error) {
    return Promise.reject(error);
  }
  return Promise.reject(errorMessage);
}
