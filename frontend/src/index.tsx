import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import { App } from "@/App.tsx";
import { init } from "@/init.ts";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./index.css";

import "./locales/i18n";

import store from "@/redux";
import { Provider } from "react-redux";

import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Configure all application dependencies.
init(store);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
