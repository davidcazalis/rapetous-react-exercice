import { ReactNode, createContext } from "react";
import { type ApiClient } from "lib/api-client";

type ApiClientProviderProps = {
  children: ReactNode;
  client: ApiClient;
};

export const ApiClientContext = createContext<ApiClient | undefined>(undefined);

export const ApiClientProvider = ({
  children,
  client,
}: ApiClientProviderProps) => {
  return (
    <ApiClientContext.Provider value={client}>
      {children}
    </ApiClientContext.Provider>
  );
};
