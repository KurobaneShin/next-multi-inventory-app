import React from 'react';

type SidebarContextType = {
  showSidebar: boolean;
  toggleSidebar: VoidFunction;
};

type SidebarProviderProps = {
  children: React.ReactNode;
};

const initialState = {
  showSidebar: true,
  toggleSidebar: () => undefined,
} as SidebarContextType;

export const SidebarContext = React.createContext(initialState);

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [open, setOpen] = React.useState(initialState.showSidebar);

  const memoizedValue = React.useMemo(() => ({ showSidebar: open, toggleSidebar: () => setOpen(!open) }), [open]);

  return <SidebarContext.Provider value={memoizedValue}>{children}</SidebarContext.Provider>;
}

export default SidebarContext;
