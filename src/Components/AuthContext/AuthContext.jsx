

import { useState , useEffect , createContext } from "react";

import { FirebaseAuthentication } from "../../Firebase/FirebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [loading , setLoading] = useState(true);
    const [ isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(()=>{
        FirebaseAuthentication.onAuthStateChanged((user)=>{
            setIsAuthenticated(!!user);
            setLoading(false);
        })
    },[]);

    return (
        <AuthContext.Provider value={{setIsAuthenticated, isAuthenticated , loading}}>
            {children}
        </AuthContext.Provider>
    )

}
