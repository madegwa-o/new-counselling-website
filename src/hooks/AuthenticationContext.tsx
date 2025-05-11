import {createContext, useState, useContext, type ReactNode} from "react";

// Updated interface with the new return type for login
export interface AuthContextType {
    accessToken: string;
    login: (username: string, password: string) => Promise<{success: boolean, error?: string}>;
    logout: () => void;
    authError: string | null;
    clearError: () => void;
    baseUrl: string;
    productionUrl: string;
    isAuthenticated: boolean;
    setIsAuthenticated: (status: boolean) => void;
    setAccessToken: (token: string) => void;
}

// Provide default values that match the interface
const defaultContext: AuthContextType = {
    accessToken: '',
    login: async () => ({ success: false }),
    logout: () => {},
    authError: null,
    clearError: () => {},
    baseUrl: '',
    productionUrl: '',
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    setAccessToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

export function useAuthentication() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthentication must be used with a AuthProvider');
    }
    return context;
}

export function AuthenticationProvider({children}: {children: ReactNode})  {
    const [accessToken, setAccessToken] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);
    const [authError, setAuthError] = useState<string | null>(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const productionUrl = import.meta.env.VITE_PRODUCTION_URL || '';

    // Return type updated to match the interface
    const login = async (username: string, password: string): Promise<{success: boolean, error?: string}> => {
        console.log('username: ', username, "password: ", password);
        setAuthError(null);

        try {
            const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle specific error messages from backend
                setAuthError(data.message);
                return { success: false, error: data.message };
            }

            console.log('Login', response);

            setAccessToken(data.accessToken);
            setIsAuthenticated(true)


            return { success: true };
        } catch (error: unknown) {
            // Properly handle error with type checking
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
                console.error(error.message);
            } else {
                console.error('An unknown error occurred');
            }

            setAuthError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = (): void => {
        setAccessToken('');
    };

    const clearError = (): void => {
        setAuthError(null);
    };

    return (
        <AuthContext.Provider value={{
            accessToken,
            login,
            logout,
            authError,
            clearError,
            baseUrl: backendUrl,
            productionUrl,
            isAuthenticated,
            setIsAuthenticated,
            setAccessToken ,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const getAuthContext  = () => useContext(AuthContext);