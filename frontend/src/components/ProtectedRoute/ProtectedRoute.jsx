import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading.jsx';

const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const verifyToken = async () => {
            const token = auth?.token;

            if (token) {
                try {
                    console.log('verificando token...', token);
                    const response = await axios.get('http://localhost:8000/api/manager/verifytoken', {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (response.status === 200) {
                        setIsAuthenticated(true); // Token es válido
                        console.log('token verificado');
                    } else {
                        setIsAuthenticated(false);
                        console.log('token no verificado');
                    }
                } catch (error) {
                    console.error('Token inválido:', error);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false); // No hay token
            }
            setLoading(false); // Finaliza la carga
        };

        verifyToken();
    }, [auth]);

    console.log('isAuthenticated', isAuthenticated);

    if (loading) {
        return <Loading />; // Muestra loading mientras se verifica
    }

    // Redirige si no está autenticado
    if (!isAuthenticated) {
        return <Navigate to="/manager" replace />;
    }

    // Renderiza los hijos si el usuario está autenticado
    return children;
};

export default ProtectedRoute;
