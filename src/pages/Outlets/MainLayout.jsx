import { useEffect,useContext } from 'react';
import {Outlet, useNavigate, useNavigator} from 'react-router-dom';
import { authContext } from '../../context/AuthContext';   
export default function MainOutlet() {
    const [currentUser] = useContext(authContext);
    const navigate=useNavigate();
    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser,navigate]);
    return <Outlet />;
}