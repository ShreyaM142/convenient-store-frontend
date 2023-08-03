import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Using the proxy instance
      "/api": {
        target:
          "http://convinent-app-backend-env-1.eba-tnyis4hv.eu-west-1.elasticbeanstalk.com/",
        // "https://limitless-lake-55070.herokuapp.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});
