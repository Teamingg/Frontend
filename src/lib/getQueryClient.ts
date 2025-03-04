import { refreshToken } from "@/service/api/refreshToken";
import {
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { useStore } from "zustand";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: 0,
        throwOnError: true,
      },
      dehydrate: {
        // 하이드레이드
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
    queryCache: new QueryCache({
      onError: async (error, query) => {},
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  // 현재 상태가 서버일 경우
  if (isServer) {
    return makeQueryClient();
  } else {
    // 브라우저일 경우
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const queryclient = getQueryClient();
