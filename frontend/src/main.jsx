import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { ColorModeScript } from "@chakra-ui/react";

import "@fontsource-variable/roboto-slab";
import "@fontsource-variable/open-sans";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("#e6edf2", "#1A2334")(props),
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  gray: {
    light: "#3a3a3a",
    dark: "#161616",
  },
};

const fonts = {
  heading: `'Roboto Slab', serif`,
  body: `'Roboto Slab', serif`,
};

const theme = extendTheme({ config, styles, colors, fonts });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </HashRouter>
    </QueryClientProvider>
  </RecoilRoot>
);
