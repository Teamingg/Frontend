"use client";

import { getQueryClient } from "@/lib/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AppProvider;
