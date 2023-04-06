import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Contrat(){
    const [Contrat,setContrat]= useState([]);
    const [loading,setLoading]=useState(false);
    const {user,setNotification}=useStateContext()

    


    useEffect(()=>{
        getContrat();
    },[])

    const onDelete=(u)=>{
        if(!window.confirm("Are you sure you want to delet this Contrat ?")){
            return
        }
        axiosClient.delete(`contrats/${u.id}`)
        .then(()=>{
            setNotification('Contrat was deleted successfully')
            getContrat()
        })
    }

    const getContrat=()=>{
        setLoading(true);
        axiosClient.get('/contrats')
        .then(({data})=>{
            setLoading(false);
            setContrat(data.data)
        })
        .catch(()=>{
            setLoading(false);
        })
    }

    return(
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>types des contrats</h1>
                {user.role == 'super_admin' && <Link to="/contrat/new" className="btn-add">Add New</Link>}
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Solde</th>
                            <th>Autorisation</th>
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
                        {Contrat.map(u=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.soldec}</td>
                                <td>{u.autorisation}</td>
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