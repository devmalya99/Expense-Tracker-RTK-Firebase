import { useEffect, useState , useContext } from 'react';
import {FirebaseAuthentication} from '../Firebase/FirebaseConfig'
import { useNavigate } from 'react-router-dom';

import  {AuthContext} from '../Components/AuthContext/AuthContext';

export const ProtectedRoute = ({children})=>{

    const {loading, isAuthenticated}  = useContext(AuthContext);
  
    const Navigate = useNavigate();
    



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
