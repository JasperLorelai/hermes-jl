process.loadEnvFile(".env.local");

import {defineConfig} from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.NODE_ENV === "development" ? `http://localhost:${process.env.PORT}/` : "https://jasperlorelai.eu/",
    setupNodeEvents(on, config) {},
  },
});
