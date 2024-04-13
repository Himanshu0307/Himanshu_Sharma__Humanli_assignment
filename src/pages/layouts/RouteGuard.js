import { Navigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

export default function RouteGuard(props) {
    const [currentUser] = useAuth()
    if (!currentUser) {
        return <Navigate to={'/login'} />
    }
    return <div>{props.children}</div>
}