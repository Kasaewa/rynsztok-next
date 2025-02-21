// ten plik z czasem stanie się konieczny do działania aplikacji

"use client";

import { Layout } from "../components/layout/Layout";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};
