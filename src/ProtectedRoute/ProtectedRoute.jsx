import { useEffect, useState } from 'react';
import {FirebaseAuthentication} from '../Firebase/FirebaseConfig'
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({children})=>{

    const [ loading, setLoading ] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(()=>{
        FirebaseAuthentication.onAuthStateChanged((user)=>{
           if(user)
           {
            setIsAuthenticated(true);
           }
           else
           {
            setIsAuthenticated(false);
           }
      // loading false after checking authentication state
      setLoading(false);
        });
    },[]);


// While determining if user is authenticated, show loading message
    
if(loading)
    {
        return <h1>Loading...</h1>
    }


    if(isAuthenticated)
    {
        return children;
    }
    else{
        return <Navigate to='/'/>
    }
}
