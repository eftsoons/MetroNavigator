import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Allows using React dev server along with building a React application with Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    tailwindcss(),
  ],
  publicDir: "./public",
  // server: {
  //   // Exposes your dev server and makes it accessible for the devices in the same network.
  //   allowedHosts: ["test.miniappsmetro.ru"],
  //   host: true,
  // },
});
