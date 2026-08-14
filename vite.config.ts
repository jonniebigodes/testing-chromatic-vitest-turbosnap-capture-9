/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { chromaticPlugin } from "@chromatic-com/vitest/plugin";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@ark-ui/react/tooltip",
      "@ark-ui/react/popover",
      "@ark-ui/react/dialog",
      "@ark-ui/react/drawer",
      "@ark-ui/react/portal",
    ],
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
      {
        plugins: [
          chromaticPlugin({
            disableAutoSnapshot: true,
            reporter: {
              enabled: true,
              verbose: true,
            },
            turboSnap: true,
          }),
        ],
        test: {
          name: "chromatic",
          include: ["src/components/**/*.test.tsx"],
          //setupFiles: ["./src/test-setup.ts"],
          browser: {
            enabled: true,
            headless: true,
            screenshotFailures: false,
            provider: playwright({}),
            viewport: {
              width: 1280,
              height: 800,
            },
            instances: [
              {
                browser: "chromium",
              },
              /* {
                browser: "firefox",
              },

              {
                browser: "webkit",
              }, */
            ],
          },
        },
      },
    ],
  },
});
