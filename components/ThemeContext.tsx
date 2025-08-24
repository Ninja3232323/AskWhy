import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ColorScheme, darkColors, lightColors } from '../constants/Colors';

interface ThemeContextType {
    isDark: boolean;
    colors: ColorScheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    colors: lightColors,
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

    useEffect(() => {
        // 从存储中加载主题偏好
        const loadThemePreference = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('themePreference');
                if (savedTheme) {
                    setIsDark(savedTheme === 'dark');
                } else {
                    setIsDark(systemColorScheme === 'dark');
                }
            } catch (error) {
                console.error('Failed to load theme preference', error);
            }
        };

        loadThemePreference();
    }, [systemColorScheme]);

    const toggleTheme = async () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        try {
            await AsyncStorage.setItem('themePreference', newTheme ? 'dark' : 'light');
        } catch (error) {
            console.error('Failed to save theme preference', error);
        }
    };

    const colors = isDark ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};