process.loadEnvFile(".env.local");

import {defineConfig} from "cypress";

import getBaseURL from "@/handles/getBaseURL";

export default defineConfig({
  e2e: {
    baseUrl: getBaseURL(),
    setupNodeEvents(on, config) {},
  },
});
