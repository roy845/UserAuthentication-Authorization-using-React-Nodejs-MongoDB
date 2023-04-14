import React from "react";
import { Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Unauthorized from "./components/Unauthorized";
import Admin from "./components/Admin";

const ROLES = {
  'User':2001,
  'Editor':1984,
  'Admin':5150
}

const App=()=>{

 

  return (
      
      <Routes>
      <Route path = "/" element = {<Layout/>}>

        {/* public routes */}
        <Route path="/" element={<Login/>}/>
        <Route path="signup" element={<Signup />}/>
        <Route path = "forgotpassword" element = {<ForgotPassword/>}/>
        <Route path = "reset-password/:token" element = {<ResetPassword/>}/>
        <Route path = "unauthorized" element = {<Unauthorized/>}/>
        

          {/* we want to protect these routes */}
        <Route element = {<PersistLogin/>}>
            <Route element = {<RequireAuth allowedRoles={[ROLES.User]}/>}>
              <Route path = "dashboard" element = {<Dashboard/>}/>
            </Route>

          <Route element = {<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
            <Route path = "admin" element = {<Admin/>}/>
          </Route>

        </Route>

          
        
          {/* catch all */}
          <Route path = "*" element = {<Error/>}/>


      </Route>
       
      
       
    </Routes>
    
  );
}

export default App;
