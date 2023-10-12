import { useContext } from "react";
import { ApiClientContext } from "./Provider";

export const useApiClient = () => {
  const apiClient = useContext(ApiClientContext);

  if (!apiClient) {
    throw new Error("useApiClient must be used within an ApiClientProvider");
  }

  return apiClient;
};
