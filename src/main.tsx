import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ApiClient } from "@/lib/api-client";
import { ApiClientProvider } from "@/components/ApiClient";
import "@/index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiClient, ApiClientProvider } from "./api-client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();
const apiClient = new ApiClient();

root.render(
  <React.StrictMode>
    <ApiClientProvider client={apiClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ApiClientProvider>
  </React.StrictMode>
);
