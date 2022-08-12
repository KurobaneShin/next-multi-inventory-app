import React, { useMemo } from 'react';

import { AppBar, Box, styled, Theme, Toolbar, useTheme } from '@mui/material';

import useSidebar from '@/hooks/useSidebar';

type Props = {
  children: React.ReactNode;
};

interface MainStyleProps {
  theme: Theme;
  open: boolean;
}

function MainLayout({ children }: Props) {
  const theme = useTheme();
  const { showSidebar } = useSidebar();

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: MainStyleProps) => ({
    backgroundColor: theme.palette.grey[600],
    width: '100%',
    minHeight: 'calc(100vh - 88px)',
    flexGrow: 1,
    padding: '20px',
    marginTop: '88px',
    marginRight: '20px',
    borderRadius: theme.shape.borderRadius,
  }));

  const header = useMemo(
    () => (
      <Toolbar
        sx={{
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '88px',
          },
        }}
      >
        aqui
        {/* <Header /> */}
      </Toolbar>
    ),
    []
  );

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={
          {
            // bgcolor: theme.palette.warning.main,
            // transition: showSidebar ? theme.transitions.create('width') : 'none'
          }
        }
      >
        {header}
      </AppBar>

      <Main theme={theme} open={showSidebar}>
        {children}
      </Main>
    </Box>
  );
}

export default MainLayout;
