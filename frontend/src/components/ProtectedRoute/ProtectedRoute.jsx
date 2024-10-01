import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../Loading/Loading.jsx'
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
    const { auth, loading } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const token = auth?.token || Cookies.get('authToken');

            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/manager/verifytoken', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        if (!loading) {
            verifyToken();
        }
    }, [auth, loading]);

    if (loading) {
        return <Loading />;
    }

    // Si isAuthenticated es false o null, redirige a la página de inicio de sesión
    if (isAuthenticated === false) {
        return <Navigate to="/manager" replace />;
    }

    return children;
}

export default ProtectedRoute
