import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');

    return token ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
