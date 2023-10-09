import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ApiClient, ApiClientProvider } from "./api-client";

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
