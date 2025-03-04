"use client";

import { queryclient } from "@/lib/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { ReactNode } from "react";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryclient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
