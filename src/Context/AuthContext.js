import { createContext, useEffect, useState } from "react"

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    useEffect(()=>{},[currentUser])

    return (<authContext.Provider value={[currentUser, setCurrentUser]}>
        {children}
    </authContext.Provider>);

}