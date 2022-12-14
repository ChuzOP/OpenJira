import "../styles/globals.css";
import type { AppProps } from "next/app";

import { UIProvider } from "../context/ui";
import { darkTheme, lightTheme } from "../themes";
import { EntriesProvider } from "../context/entries";

import { SnackbarProvider } from "notistack";

import { CssBaseline, ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
