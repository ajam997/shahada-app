import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './colorPalette.js'; 

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const theme = useMemo(() => {
        const palette = darkMode ? darkPalette : lightPalette;
        return createTheme({
            palette: {
                mode: darkMode ? 'dark' : 'light',
                background: {
                    default: palette.background,
                },
                text: {
                    primary: palette.text,
                },
                primary: {
                    main: palette.primary,
                },
                secondary: {
                    main: palette.secondary,
                },
            },
        });
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};