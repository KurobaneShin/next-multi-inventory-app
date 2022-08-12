import React from 'react';

import { SidebarContext } from '@/contexts/SidebarContext';

const useSidebar = () => {
  const context = React.useContext(SidebarContext);

  if (!context) throw new Error(`'useSidebar' must be wrapped within Provider`);

  return context;
};

export default useSidebar;
