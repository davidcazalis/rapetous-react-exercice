import { ReactNode, createContext, useContext } from "react";
import ApiClient from "./client";

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

export const useApiClient = () => {
  const apiClient = useContext(ApiClientContext);

  if (!apiClient) {
    throw new Error("useApiClient must be used within an ApiClientProvider");
  }

  return apiClient;
};
