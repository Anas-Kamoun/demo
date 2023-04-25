import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Contrat(){
    const [Poste,setPoste]= useState([]);
    const [loading,setLoading]=useState(false);
    const {user,setNotification}=useStateContext()

    


    useEffect(()=>{
        getPoste();
    },[])

    const onDelete=(u)=>{
        if(!window.confirm("Are you sure you want to delet this Poste ?")){
            return
        }
        axiosClient.delete(`postes/${u.id}`)
        .then(()=>{
            setNotification('Postes was deleted successfully')
            getPoste()
        })
    }

    const getPoste=()=>{
        setLoading(true);
        axiosClient.get('/postes')
        .then(({data})=>{
            setLoading(false);
            setPoste(data.data)
        })
        .catch(()=>{
            setLoading(false);
        })
    }

    return(
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>Types Des Postes</h1>
                {user.role == 'super_admin' && <Link to="/poste/new" className="btn-add">Add New</Link>}
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
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
                        {Poste.map(u=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/poste/'+u.id}>Edit</Link>
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