import type { Preview } from "@storybook/react-vite";
/* import { ThemeProvider } from "@emotion/react";
import { theme } from "../src/tokens/theme"; */

const preview: Preview = {
  /* decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ], */
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    /*  viewport: {
      options: {
        xsm: { name: "XSmall", styles: { width: "320px", height: "900px" } },
        sm: { name: "Small", styles: { width: "640px", height: "900px" } },
        md: { name: "Medium", styles: { width: "768px", height: "900px" } },
        lg: { name: "Large", styles: { width: "1024px", height: "900px" } },
        xl: { name: "XL", styles: { width: "1280px", height: "900px" } },
        "2xl": { name: "2XL", styles: { width: "1536px", height: "900px" } },
        folded: { name: "Folded", styles: { width: "280px", height: "653px" } },
      },
    }, */
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
