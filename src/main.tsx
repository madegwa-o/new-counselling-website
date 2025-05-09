import './global-polyfill';
import { createRoot } from 'react-dom/client';
import './index.css';
import ThemeContextProvider from "./hooks/themeProvider.tsx";
import { AuthenticationProvider } from "./hooks/AuthenticationContext.tsx";
import BaseLayout from "./BaseLayout.tsx";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeContextProvider>
                <AuthenticationProvider>
                    <BaseLayout />
                </AuthenticationProvider>
            </ThemeContextProvider>
        </BrowserRouter>
    </StrictMode>
);
