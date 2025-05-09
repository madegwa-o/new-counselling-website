import { createContext, useContext, useEffect, useState,type ReactNode } from "react";

// Define theme type for better type safety
type ThemeType = "light" | "dark";

// Theme context with proper TypeScript typing
type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
    setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
    setTheme: () => {},
});

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export default function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>(() => {
        // First try to get the theme from localStorage
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }

        // Otherwise, respect system preferences
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark";
        }

        // Default to light theme
        return "light";
    });

    useEffect(() => {
        // Apply the current theme to the body element
        document.body.className = theme;
        localStorage.setItem("theme", theme); // Persist the theme
    }, [theme]);

    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            // Only change if user hasn't manually set a preference
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? "dark" : "light");
            }
        };

        // Add event listener
        mediaQuery.addEventListener('change', handleChange);

        // Clean up
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = (): void => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Create a properly typed setTheme function for the context
    const setThemeContext = (newTheme: ThemeType): void => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeContext }}>
            {children}
        </ThemeContext.Provider>
    );
}