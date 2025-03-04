"use server";

import axios, { AxiosError } from "axios";
import { defaultInstanceOptions } from "./defaultInstance";

import { cookies } from "next/headers";
import handleError from "@/service/handleError";

export const server = axios.create({
  ...defaultInstanceOptions,
  headers: {
    Cookie: cookies().toString(),
  },
});

server.interceptors.response.use(
  (response) => response,
  async (error) => await onResponse(error)
);

async function onResponse(
  error: AxiosError<{ status: number; message: string }>
) {
  const errorCode = error!.response!.data.status;

  let errorMessage;
  try {
    handleError(errorCode);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.reject(errorMessage);
}