import {authContext} from '../../Context/AuthContext'
import {useNavigator} from 'react-router-dom';   
export default  MainOutlet = () => {
    const [currentUser] = useContext(authContext);
    const navigate=useNavigator();
    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);
    return <Outlet />;
}