import { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
 import axiosClient from "../axios-client";
 import { useStateContext } from "../Contexts/ContextProvider";
 import {TextField,Modal,Button, Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';


 export default function Users(){
    const [Users,setUsers]= useState([]);
    const [loading,setLoading]=useState(false);
    const {setNotification}=useStateContext();


 const [open, setOpen] = useState(false);
 const [selectedUser, setSelectedUser] = useState(null);



  const handleClickOpen = (u) => {
    setSelectedUser(u);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (selectedUser) {
      onDelete(selectedUser);
      setSelectedUser(null);
    }
  };



    useEffect(()=>{
        getUsers();
    },[])

   

  const onDelete = (u) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`users/${u.id}`)
      .then(() => {
        setNotification("User was deleted successfully");
        getUsers();
      })
      .catch(() => {
        setNotification("Error deleting user");
      });
  };

   

      const getUsers = () => {
    setLoading(true);
    axiosClient.get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
        setNotification("Error loading users");
      });
  };

    return(
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h2>Liste des demandes de Congés</h2>
             </div>
             <div className="card animated fadeInDown">
                 <table>
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>Nom</th>
                             <th>Email</th>
                             <th>Solde disponible</th>
                             <th>Type De Congé</th>
                             <th>Date Début</th>
                             <th>Date Fin</th>

                             <th>État</th>
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
                                <td>{u.created_at}</td>

                                <td>{u.created_at}</td>
                                <td>{u.created_at}</td>
                                <td>État</td>
                                <td> 
                                    
                                    <button onClick={(ev) => handleClickOpen(u)} className="btn-add" >Validée </button>
                                     &nbsp;
                                    <button onClick={(ev) => handleClickOpen(u)} className="btn-delete" >Annuler </button>  
                                     
                                </td>    
                            </tr>
                        ))}
                        </tbody>
}


</table>
                 <Dialog open={open} onClose={handleClose}>
                 <DialogTitle>Annulation</DialogTitle>
         <DialogContent>
           <TextField label="Raison :"  />
           <input type="text" placeholder="L'explication de refus ..." />
           <br />
          
          
      
     </DialogContent>
     <DialogActions>
       {/* <Button onClick={handleClose} color="primary">
        <AppBar> </AppBar>
         Cancel
       </Button> */}
       <Button onClick={handleClose} color="primary">
         Envoyer
       </Button>
     </DialogActions>
   </Dialog>
             </div>
         </div>
     )
}



























 































{/* <button

                      onClick={(ev) => handleClickOpen(u)}
                      className="btn-add"
                    >
                      Validée
                    </button>
                    &nbsp;
                    <button onClick={ev=>onDelete(u)}className="btn-edit">Modifier</button>
                    &nbsp;
                    <button
                      onClick={(ev) => handleClickOpen(u)}
                      className="btn-delete"
                    >
                      Annuler
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
})
        </table>
      </div>
      {selectedUser && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal-container">
            <h3>Confirmation</h3>
            <p>
              Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
              <strong>{selectedUser.name}</strong> ?
            </p>
            <div className="modal-buttons">
              <button onClick={handleClose} className="btn-delete">
                Annuler
              </button>
              <button onClick={handleClose} className="btn-add">
                Supprimer
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}



 */}



















// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axiosClient from "../axios-client";
// import { useStateContext } from "../Contexts/ContextProvider";

// export default function Users(){
//     const [Users,setUsers]= useState([]);
//     const [loading,setLoading]=useState(false);
//     const {setNotification}=useStateContext()


//     useEffect(()=>{
//         getUsers();
//     },[])

//     const onDelete=(u)=>{
//         if(!window.confirm("Are you sure you want to delet this user ?")){
//             return
//         }
//         axiosClient.delete(`users/${u.id}`)
//         .then(()=>{
//             setNotification('User was deleted successfully')
//             getUsers()
//         })
//     }

//     const getUsers=()=>{
//         setLoading(true);
//         axiosClient.get('/users')
//         .then(({data})=>{
//             setLoading(false);
//             setUsers(data.data)
//         })
//         .catch(()=>{
//             setLoading(false);
//         })
//     }

//     return(
//         <div>
//             <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
//                 <h2>List des demandes de Congé</h2>
//             </div>
//             <div className="card animated fadeInDown">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Nom</th>
//                             <th>Solde disponible</th>
//                             <th>Type De Congé</th>
//                             <th>Periode</th>
//                             <th>État</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     {loading && <tbody>
//                         <tr>
//                             <td colSpan="5" className="text-center">
//                             Loading...
//                             </td>
//                         </tr>
//                     </tbody>
//                     }
//                     {!loading && <tbody>
//                         {Users.map(u=>(
//                             <tr key={u.id}>
//                                 <td>{u.id}</td>
//                                 <td>{u.name}</td>
//                                 <td>{u.email}</td>
//                                 <td>{u.created_at}</td>
//                                 <td>{u.created_at}</td>
//                                 <td>État</td>
//                                 <td>
//                                     <button onClick={ev=>onDelete(u)}className="btn-add">Validée</button>
//                                     &nbsp;
//                                     <button onClick={ev=>onDelete(u)}className="btn-edit">Modifier</button>
//                                     &nbsp;
//                                     <button onClick={ev=>onDelete(u)}className="btn-delete">Annuler</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                     }
//                 </table>
//             </div>
//         </div>
//     )
// }