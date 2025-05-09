import './global-polyfill';
import { createRoot } from 'react-dom/client'
import './index.css'
import  ThemeContextProvider from "./hooks/themeProvider.tsx";
import {AuthenticationProvider} from "./hooks/AuthenticationContext.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./pages/login/login.tsx";
import HomePage from "./pages/home/homePage.tsx";
import BaseLayout from "./BaseLayout.tsx";

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
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);


createRoot(document.getElementById('root')!).render(

    <ThemeContextProvider>
        <AuthenticationProvider>
            <RouterProvider router={router}/>
        </AuthenticationProvider>
    </ThemeContextProvider>
)
