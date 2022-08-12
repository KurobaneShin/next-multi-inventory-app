import React, { useCallback, createContext, useMemo } from 'react';

import { PaletteMode } from '@mui/material';
import { parseCookies, setCookie } from 'nookies';

type ModeProviderProps = {
  children: React.ReactNode;
};

type ChangeModeProps = {
  mode: PaletteMode;
  onChangeThemeType: (themeType: PaletteMode) => void;
};

const initialState: ChangeModeProps = {
  mode: 'light',
  onChangeThemeType: () => undefined,
};

export const ModeContext = createContext(initialState);

export function ModeProvider({ children }: ModeProviderProps) {
  const [mode, setMode] = React.useState<ChangeModeProps>(initialState);

  const onChangeThemeType = useCallback(
    (themeType: PaletteMode) => {
      setMode({ ...mode, mode: themeType });

      setCookie(undefined, 'mode', themeType, {
        path: '/',
      });
    },
    [mode, setMode]
  );

  React.useEffect(() => {
    const { mode: thisMode } = parseCookies();
    if (thisMode) {
      setMode({ ...mode, mode: thisMode as PaletteMode });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memorizedMode = useMemo(() => ({ ...mode, onChangeThemeType }), [mode, onChangeThemeType]);

  return <ModeContext.Provider value={memorizedMode}>{children}</ModeContext.Provider>;
}

export default ModeContext;
