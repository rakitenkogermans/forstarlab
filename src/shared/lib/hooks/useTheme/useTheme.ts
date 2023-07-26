import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localstorage';
import { THEME } from '../../../const/theme';
import { ThemeContext } from '../../context/ThemeContext';

interface UseThemeReturn {
    theme: THEME;
    toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
    const { theme = THEME.LIGHT, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        let newTheme: THEME;

        if (theme === THEME.DARK) {
            newTheme = THEME.LIGHT;
        } else {
            newTheme = THEME.DARK;
        }

        if (setTheme) {
            setTheme(newTheme);
        }
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme,
        toggleTheme,
    };
};
