import {createContext, useState, useContext,type Dispatch,type SetStateAction,type ReactNode} from "react";

// Updated interface to include login and logout functions
type AuthContextType = {
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    baseUrl: string;
    productionUrl: string;
};

// Properly typed contextRef
let contextRef: AuthContextType | null = null;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthentication() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthentication must be used with a AuthProvider');
    }
    return context;
}

export function AuthenticationProvider({children}: {children: ReactNode})  {
    const [accessToken, setAccessToken] = useState<string>(' ');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const productionUrl = import.meta.env.VITE_PRODUCTION_URL;

    // Added type annotations to parameters
    const login = async (username: string, password: string): Promise<void> => {
        try {
            const response = await fetch(`${backendUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            setAccessToken(data.accessToken);
        } catch (error: unknown) {
            // Properly handle error with type checking
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('An unknown error occurred');
            }
        }
    };

    const logout = (): void => {
        setAccessToken('');
    };

    const contextValue: AuthContextType = {
        accessToken,
        setAccessToken,
        login,
        logout,
        baseUrl: backendUrl,
        productionUrl
    };

    contextRef = contextValue;

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const getAuthContext = (): AuthContextType | null => contextRef;