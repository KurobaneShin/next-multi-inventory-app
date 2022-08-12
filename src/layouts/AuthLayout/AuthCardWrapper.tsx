import { Box } from '@mui/material';

import { IMainCardProps } from '@/types';

function AuthCardWrapper({ children }: IMainCardProps) {
  return <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>;
}

export default AuthCardWrapper;
