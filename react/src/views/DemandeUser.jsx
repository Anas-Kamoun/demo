import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

export default function DemnadeUser(){
    const [DCongee,setDCongee]= useState([]);
    const [loading,setLoading]=useState(false);
    const {user,setNotification}=useStateContext()

    


    useEffect(()=>{
        getDCongee();
    },[])

    const onDelete=(u)=>{
        if(!window.confirm("Are you sure you want to delet this user ?")){
            return
        }
        axiosClient.delete(`users/${u.id}`)
        .then(()=>{
            setNotification('User was deleted successfully')
            getDCongee()
        })
    }

    const getDCongee=()=>{
        setLoading(true);
        axiosClient.get(`/conges/`).then(({ data }) => {
            setLoading(false);
            setConges(data.data);
          });
        axiosClient.get('/dconges')
        .then(({data})=>{
            setLoading(false);
            setDCongee(data.data)
            console.log(data.data);
        })
        .catch(()=>{
            setLoading(false);
        })
    }

    return(
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>Vos demandes de Congé</h1>
                {user.role == 'user' && <Link to="/demandeuser/new" className="btn-add">Add New</Link>}
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type Congé</th>
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
                        {DCongee.map(u=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.type}</td>
                                <td>{u.user_id}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/demandeuser/'+u.id}>Edit</Link>
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