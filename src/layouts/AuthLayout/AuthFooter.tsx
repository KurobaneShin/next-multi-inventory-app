import { Stack, Typography } from '@mui/material';

const name = 'Icaro';

function AuthFooter() {
  return (
    <Stack alignItems="center">
      <Typography variant="subtitle2">&copy; {name}</Typography>
    </Stack>
  );
}

export default AuthFooter;
