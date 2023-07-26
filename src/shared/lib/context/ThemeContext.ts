import { createContext } from 'react';

import { type THEME } from '../../const/theme';

export interface ThemeContextProps {
    theme?: THEME;
    setTheme?: (theme: THEME) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
