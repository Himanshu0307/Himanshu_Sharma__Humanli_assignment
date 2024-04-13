import { useEffect, useContext } from 'react';
import { Outlet, useNavigate, useNavigator } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
export default function MainOutlet() {
    const [currentUser] = useContext(authContext);
    const navigate = useNavigate();

    return <Outlet />;
}