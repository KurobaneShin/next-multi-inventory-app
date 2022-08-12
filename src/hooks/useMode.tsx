import React from 'react';

import { ModeContext } from '@/contexts/modeContext';

const useMode = () => {
  const context = React.useContext(ModeContext);

  if (!context) throw new Error(`'useTheme' must be wrapped within Provider`);

  return context;
};

export default useMode;
