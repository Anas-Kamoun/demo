import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Users(){
    const [Users,setUsers]= useState([]);
    const [loading,setLoading]=useState(false);
    const {user,setNotification}=useStateContext()

    


    useEffect(()=>{
        getUsers();
    },[])

    const onDelete=(u)=>{
        if(!window.confirm("Are you sure you want to delet this user ?")){
            return
        }
        axiosClient.delete(`users/${u.id}`)
        .then(()=>{
            setNotification('User was deleted successfully')
            getUsers()
        })
    }

    const getUsers=()=>{
        setLoading(true);
        axiosClient.get('/users')
        .then(({data})=>{
            setLoading(false);
            setUsers(data.data)
        })
        .catch(()=>{
            setLoading(false);
        })
    }

    return(
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>Demande Cogee</h1>
                {user.role == 'user' && <Link to="/demandeuser/new" className="btn-add">Add New</Link>}
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                            Loading...
                            </td>
                        </tr>
                    </tbody>
                    }
                    {!loading && <tbody>
                        {Users.map(u=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                                    &nbsp;
                                    <button onClick={ev=>onDelete(u)}className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
            </div>
        </div>
    )
}