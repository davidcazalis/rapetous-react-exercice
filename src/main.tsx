import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ApiClient } from "@/lib/api-client";
import { ApiClientProvider } from "@/components/ApiClient";

import "@/index.css";

const client = new ApiClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApiClientProvider client={client}>
      <App />
    </ApiClientProvider>
  </React.StrictMode>
);
