import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
export default function Contrat(){
    const [Contrat,setContrat]= useState([]);
    const [loading,setLoading]=useState(false);
    const {user,setNotification}=useStateContext();
    const navigate = useNavigate();

    


    useEffect(()=>{
        if (user.role !='super_admin'){
            navigate("/dashboard");
        }else{
            getContrat();
        }
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
                <h1>Types des contrats</h1>
                {user.role == 'super_admin' && <Link to="/contrat/new" className="btn-add">Ajouter</Link>}
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Solde</th>
                            <th>Autorisation</th>
                            <th>Date de création</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && 
                    <tbody>
                        <tr>
                            <td colSpan="6" className="text-center">
                            Chargement...
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
                                    <Link className="btn-edit" to={'/contrat/'+u.id}>Modifier</Link>
                                    &nbsp;
                                    <button onClick={ev=>onDelete(u)}className="btn-delete">Supprimer</button>
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