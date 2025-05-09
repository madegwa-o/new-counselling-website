import './global-polyfill';
import { createRoot } from 'react-dom/client';
import './index.css';
import ThemeContextProvider from "./hooks/themeProvider.tsx";
import { AuthenticationProvider } from "./hooks/AuthenticationContext.tsx";
import BaseLayout from "./BaseLayout.tsx";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom"; // Import BrowserRouter
import HomePage from './pages/home/homePage.tsx';
import Login from "./pages/login/login.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            }
        ]
    },
    // Login and Register routes outside of the BaseLayout
    {
        path: '/login',
        element: <Login />,
    },

]);
//
// createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//         <BrowserRouter>
//             <ThemeContextProvider>
//                 <AuthenticationProvider>
//                     <BaseLayout />
//                 </AuthenticationProvider>
//             </ThemeContextProvider>
//         </BrowserRouter>
//     </StrictMode>
// );


createRoot(document.getElementById('root')!).render(
    <StrictMode>
            <ThemeContextProvider>
                <AuthenticationProvider>
                    <RouterProvider  router={router}/>
                </AuthenticationProvider>
            </ThemeContextProvider>
    </StrictMode>
);
