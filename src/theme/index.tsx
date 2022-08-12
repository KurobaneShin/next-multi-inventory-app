import React from 'react';

import { Box, createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';

import useMode from '@/hooks/useMode';

type ThemeConfigProps = {
  children: React.ReactNode;
};

function ThemeConfig({ children }: ThemeConfigProps) {
  const { mode } = useMode();

  const customTheme = React.useMemo(
    () => ({
      palette: {
        background: {
          default: 'red',
        },
        primary: {
          main: '#1a237e',
        },
        secondary: {
          main: '#2ca58d',
        },
        mode,
      },
    }),
    [mode]
  );
  const theme = createTheme(customTheme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>{children}</Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default ThemeConfig;
