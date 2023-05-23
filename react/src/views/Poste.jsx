import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
export default function Contrat(){
    const [Poste,setPoste]= useState([]);
    const [loading,setLoading]=useState(false);
    const {user,setNotification}=useStateContext()
    const navigate = useNavigate();


    useEffect(()=>{
        if (user.role =='user'){
            navigate("/dashboard");
        }else{
        getPoste();}
    },[])

    const onDelete=(u)=>{
        if(!window.confirm("Voulez-vous vraiment supprimer ce poste? ?")){
            return
        }
        axiosClient.delete(`postes/${u.id}`)
        .then(()=>{
            setNotification('Poste créer avec succés')
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
                <h1>Types des postes</h1>
                {<Link to="/poste/new" className="btn-add">Ajouter</Link>}
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Date de création</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                            Chargement...
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
                                    <Link className="btn-edit" to={'/poste/'+u.id}>Modifier</Link>
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