import React, {useEffect }  from "react";
import {Outlet,useNavigate} from 'react-router-dom'
import DrawerComponent from './Drawer'
import Footer from './Footer'
import useAuth from '../hooks/useAuth'
import SplashScreen from "./SplashScreen";


const Layout = ()=>{
  
    const { auth,isLoading,setIsLoading } = useAuth(); // get the auth state from the context
    const navigate = useNavigate();
    

    useEffect(() => {
      
        setTimeout(()=>{
            setIsLoading(false);
        },2000)
      // redirect to dashboard if user is already logged in
      if (auth.accessToken) {
        navigate("/dashboard", { replace: true });
      }
    }, [auth.accessToken]);


    useEffect(() => {
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false);
        },8000);
    },[]);

  
  
    return (
        <main className='App'>
            
           {auth.accessToken && isLoading ?
           <>
           <SplashScreen/>
           
           </> :
           <>
            {auth.accessToken && <DrawerComponent />}
            <Outlet/>
            <Footer/>
           </>
         
           }
           
           
        </main>
    )
}

export default Layout;