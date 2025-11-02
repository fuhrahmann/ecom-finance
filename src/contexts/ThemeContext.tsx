'use client';

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { ReactNode } from 'react';

/**
 * Theme Provider using next-themes
 * Wraps the application to provide theme functionality
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}

/**
 * Custom hook to access theme
 * Returns theme value ('light' | 'dark' | 'system') and utility functions
 */
export function useTheme() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();

  // For backwards compatibility with existing components
  // that expect theme to be 'light' or 'dark' only
  const currentTheme = (theme === 'system' ? systemTheme : theme) as 'light' | 'dark';

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return {
    theme: currentTheme || 'light',
    setTheme,
    toggleTheme,
    systemTheme,
    resolvedTheme,
  };
}
