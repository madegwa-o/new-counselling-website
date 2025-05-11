import './global-polyfill';
import { createRoot } from 'react-dom/client';
import './index.css';
import ThemeContextProvider from "./hooks/themeProvider.tsx";
import { AuthenticationProvider } from "./hooks/AuthenticationContext.tsx";
import BaseLayout from "./BaseLayout.tsx";
import { StrictMode } from "react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"; // Import BrowserRouter
import HomePage from './pages/home/homePage.tsx';
import Login from "./pages/login/login.tsx";
import Dashboard from "./components/booking/Dashboard.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import {WebSocketProvider} from "./hooks/WebSocketContext.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },

        ]
    },
    // Login and Register routes outside of the BaseLayout
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    },

]);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeContextProvider>
            <WebSocketProvider>
                <AuthenticationProvider>
                    <RouterProvider  router={router}/>
                </AuthenticationProvider>
            </WebSocketProvider>
        </ThemeContextProvider>
    </StrictMode>
);
