import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Image from 'next/image';

import photo from '@/assets/images/signIn.svg';

import AuthCardWrapper from './AuthCardWrapper';
// import AuthFooter from './AuthFooter';

const StyledRoot = styled('div')(() => ({
  minHeight: '100vh',
}));

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
};

function AuthLayout({ children, title, subtitle }: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledRoot>
      <Grid container direction="row" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={6}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="start" justifyContent="start" sx={{ width: 400 }}>
                  <Grid item sx={{ mb: 3 }}>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="caption">{subtitle}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? 'column-reverse' : 'row'}
                      alignItems="center"
                      justifyContent="start"
                    >
                      <Grid item>
                        <Stack alignItems="start" justifyContent="start" spacing={1}>
                          {children}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={6}
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light,
          }}
        >
          <Box component={Image} src={photo} />
        </Grid>

        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid> */}
      </Grid>
    </StyledRoot>
  );
}

export default AuthLayout;
