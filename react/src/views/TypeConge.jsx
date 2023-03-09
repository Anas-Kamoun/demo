import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Add, Delete, Edit } from '@mui/icons-material';
import { isEditMode  } from "editmode-react";
import { Link } from "react-router-dom";

const initialNatures = [
  { id: 1, name: 'Congé annuel', color: 'green' },
  { id: 2, name: 'Congé maladie', color: 'red' },
  { id: 3, name: 'Congé maternité', color: 'purple' },
];

const TypeConge = () => {
  const [natures, setNatures] = useState(initialNatures);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#black');
  const [natureToEdit, setNatureToEdit] = useState(null);

  const handleClickOpen = (nature) => {
    if (nature) {
      setName(nature.name);
      setColor(nature.color);
      setNatureToEdit(nature);
    } else {
      setName('');
      setColor('#000000');
      setNatureToEdit(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleCreateNature = () => {
    setNatures((prevNatures) => [
      ...prevNatures,
      {
        id: prevNatures.length + 1,
        name,
        color,
      },
    ]);
    setName('');
    setColor('#000000');
    handleClose();
  };

  const handleEditNature = () => {
    setNatures((prevNatures) =>
      prevNatures.map((nature) => (nature.id === natureToEdit.id ? { ...nature, name, color } : nature))
    );
    setName('');
    setColor('black');
    handleClose();
  };

  const handleDeleteNature = (natureToDelete) => {
    setNatures((prevNatures) => prevNatures.filter((nature) => nature.id !== natureToDelete.id));
  };
  const [loading,setLoading]=useState(false);
  const {user,setNotification}=useStateContext();
  const [Conges,setConges]= useState([]);
  

  useEffect(()=>{
    getConge();
},[])

  const getConge=()=>{
    setLoading(true);
    axiosClient.get('/conges')
    .then(({data})=>{
      console.log(data);
      setConges(data.data)
        setLoading(false);
    })
    .catch(()=>{
        setLoading(false);
    })
}
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>Type Congés</h1>
                {user.role == 'super_admin' && <Link onClick={() => handleClickOpen(null)} className="btn-add">Add New</Link>}
            </div>
      {/* {user.role == 'super_admin' &&  */}
      
      <div className="card animated fadeInDown">
      <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nature Conges</th>
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
                        {Conges.map(u=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
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
<Dialog open={open} onClose={handleClose}>
  <DialogTitle>{isEditMode ? 'Modifier la nature' : 'Créer une nature'}</DialogTitle>
  <DialogContent>
    <TextField label="Nature de congé" required value={name} onChange={handleNameChange} fullWidth margin="normal" />
    <TextField label="Couleur" type="color" value={color} onChange={handleColorChange} fullWidth margin="normal" />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Annuler</Button>
    {isEditMode && (
      <Button onClick={() => handleDeleteNature(natureToEdit)} color="secondary">
        Supprimer
      </Button>
    )}
    <Button onClick={natureToEdit ? handleEditNature : handleCreateNature} color="primary">
      {isEditMode ? 'Modifier' : 'Créer'}
    </Button>
  </DialogActions>
</Dialog>
</div>
);

       


};
  export default TypeConge;

































