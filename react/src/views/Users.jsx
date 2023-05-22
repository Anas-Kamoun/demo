import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
export default function Users(){
    const [Users,setUsers]= useState([]);
    const [Poste,setPoste]= useState([]);
    const [Contrat,setContrat]= useState([]);
    const [loading,setLoading]=useState(false);
    const {user,setNotification}=useStateContext()
    const navigate = useNavigate();
    
    const getPosteNameById = (postId) => {
        const poste = Poste.find((p) => p.id === postId);
        return poste ? poste.name : "";
      };
      const getContratNameById = (postId) => {
        const poste = Contrat.find((p) => p.id === postId);
        return poste ? poste.name : "";
      };

    useEffect(()=>{
        if (user.role != "super_admin") {
            navigate("/dashboard");
          } else {
        getUsers();}
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
            setUsers(data.data)
        })
        .catch(()=>{
            setLoading(false);
        })
        axiosClient.get('/postes')
        .then(({data})=>{
            setPoste(data.data)
        })
        .catch(()=>{
            setLoading(false);
        })
        axiosClient.get('/contrats')
        .then(({data})=>{
            setContrat(data.data)
            setLoading(false);
        })
        .catch(()=>{
            setLoading(false);
        })

    }

    return(
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>Users</h1>
                {user.role == 'super_admin' && <Link to="/users/new" className="btn-add">Add New</Link>}
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contrat</th>
                            <th>Poste</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="7" className="text-center">
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
                                <td>{getContratNameById(u.contrat_id)}</td>
                                <td>{getPosteNameById(u.poste_id)}</td>
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