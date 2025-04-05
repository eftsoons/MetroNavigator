import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import { App } from "@/App.tsx";
import { EnvUnsupported } from "@/components/EnvUnsupported.tsx";
import { init } from "@/init.ts";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./index.css";

import store from "@/redux";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root")!);

try {
  // Configure all application dependencies.
  init(false);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
} catch (e) {
  root.render(<EnvUnsupported />);
}
