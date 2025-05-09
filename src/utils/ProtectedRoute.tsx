import {useState, useEffect,type JSX} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthentication } from '../hooks/AuthenticationContext';

const baseurl = import.meta.env.VITE_BACKEND_URL

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, setIsAuthenticated: setIsAuthenticated, setAccessToken } = useAuthentication();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(isAuthenticated);

    useEffect(() => {
        const checkAuthentication = async () => {
            console.log('refreshing the token');
            if (!isAuthenticated) {
                try {
                    const response = await fetch(`${baseurl}/auth/v1/refresh`, {
                        method: 'GET',
                        credentials: 'include', // Include cookies for refresh token
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setAccessToken(data.accessToken);
                        setIsAuthenticated(true);
                        setAuthorized(true);
                    } else {
                        setAuthorized(false);
                    }
                } catch (error) {
                    console.error('Error refreshing token:', error);
                    setAuthorized(false);
                }
            } else {
                setAuthorized(true);
            }
            setLoading(false);
        };

        checkAuthentication();
    }, [isAuthenticated, setIsAuthenticated, setAccessToken]);

    if (loading) {
        // Optionally, display a loading spinner or message
        return <div>Loading...</div>;
    }

    if (!authorized) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
