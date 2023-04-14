import React from "react";
import {Link} from "react-router-dom";
import Users from './Users';
import { useNavigate } from "react-router-dom";

const Admin = ()=>{
    
    const navigate = useNavigate();
    const goBack = ()=>navigate(-1);

    return (
        <section>
            <h1>Admin's Page</h1>
            <br/>
            <Users/>
            <br/>
            <Link onClick = {goBack}>Home</Link>
        </section>
    )
}

export default Admin;