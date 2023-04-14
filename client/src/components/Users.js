import React,{useState,useEffect} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useNavigate,useLocation} from "react-router-dom";
import useLogout from "../hooks/useLogout";
const USERS_URL = '/users';

const Users = ()=>{
    const [users,setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();

    useEffect(()=>{
        let isMounted = true;

        const getUsers = async ()=>{
            try{
                const response = await axiosPrivate.get(USERS_URL);
                console.log(response.data);
                isMounted && setUsers(response.data);
            }catch(err){
                console.error(err);
                logout();
                navigate('/',{state: {from:location} ,replace:true});
            }
        }

        getUsers();

        return ()=>{
            isMounted = false;
        }

    },[])


    return (
        <article>
            <h2>Users List</h2>
            {users.length ? (
                <ul>
                    {users.map((user,i)=><li key = {i}>{user.username}</li>)}
                </ul>
            ):<p>No users to display</p>}
        </article>
    );
}

export default Users;