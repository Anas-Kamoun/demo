import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Contrat(){
    const [Conge,setConge]= useState([]);
    const [loading,setLoading]=useState(false);
    const {user,setNotification}=useStateContext()

    


    useEffect(()=>{
      getConge();
    },[])

    const onDelete=(u)=>{
        if(!window.confirm("Are you sure you want to delet this Conge ?")){
            return
        }
        axiosClient.delete(`conges/${u.id}`)
        .then(()=>{
            setNotification('Contrat was deleted successfully')
            getConge()
        })
    }

    const getConge=()=>{
        setLoading(true);
        axiosClient.get('/conges')
        .then(({data})=>{
            console.log(data);
            setLoading(false);
            setConge(data.data)
        })
        .catch(()=>{
            setLoading(false);
        })
    }

    return(
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>types des contrats</h1>
                {user.role == 'super_admin' && <Link to="/conge/new" className="btn-add">Add New</Link>}
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Contrat</th>
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
                        {Conge.map(u=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.name}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/contrat/'+u.id}>Edit</Link>
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