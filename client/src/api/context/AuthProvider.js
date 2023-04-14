import React from "react";
import {createContext,useState,useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState(JSON.parse(localStorage.getItem('auth'))||{});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    const[isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        if(persist)
            localStorage.setItem("auth", JSON.stringify(auth));
      
    }, [auth]);

    return (
        <AuthContext.Provider value = {{auth,setAuth,persist, setPersist,isLoading,setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;