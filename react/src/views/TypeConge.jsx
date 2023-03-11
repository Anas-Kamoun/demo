
import React, { useState } from 'react';
import {
  Button,Dialog,DialogActions,DialogContent,DialogTitle,IconButton,Table,TableBody,
  TableCell,TableContainer,TableHead,TableRow,TextField,
      } from '@material-ui/core';
import { Add, Delete, Edit } from '@mui/icons-material';
import { isEditMode  } from "editmode-react";
import { Link } from "react-router-dom";



const TypeConge = () => {
  const [natures, setNatures] = useState([]);
  // const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  // const [natureToEdit, setNatureToEdit] = useState(null);

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
    setColor('#000000');
    handleClose();
  };

  const handleDeleteNature = (natureToDelete) => {
    setNatures((prevNatures) => prevNatures.filter((nature) => nature.id !== natureToDelete.id));
  };

  return (
    <div>
     

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>types des congés</h1>
                {<Link to="/conge/new" className="btn-add">Add New</Link>}
      </div>

      <div className="card animated fadeInDown">
            
      
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nature de congé</th>
              <th>Couleur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <TableBody>
            {natures.map((nature) => (
              <TableRow key={nature.id}>
                <TableCell>{nature.id}</TableCell>
                <TableCell>{nature.name}</TableCell>
                <TableCell>
                  <div style={{ backgroundColor: nature.color, width: '20px', height: '20px' }}></div>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(nature)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteNature(nature)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>

</div>
</div>
);

};

 export default TypeConge;













































// import React, { useState } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from '@material-ui/core';
// import { Add } from '@mui/icons-material';


// const initialNatures = [
//   { id: 1, name: 'Congé annuel', color: '#008000' },
//   { id: 2, name: 'Congé maladie', color: '#FF0000' },
//   { id: 3, name: 'Congé maternité', color: '#800080' },
// ];

// const TypeConge = () => {
//   const [natures, setNatures] = useState(initialNatures);
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [color, setColor] = useState('#000000');


  


//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedNature, setSelectedNature] = useState(null);





//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleColorChange = (event) => {
//     setColor(event.target.value);
//   };

//   const handleCreateNature = () => {
//     setNatures((prevNatures) => [
//       ...prevNatures,
//       {
//         id: prevNatures.length + 1,
//         name,
//         color,
//       },
//     ]);
//     setName('');
//     setColor('#000000');
//     handleClose();
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleClickOpen}>
//         Create Nature
//       </Button>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Nature de congé</TableCell>
//               <TableCell>Couleur</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {natures.map((nature) => (
//               <TableRow key={nature.id}>
//                 <TableCell>{nature.id}</TableCell>
//                 <TableCell>{nature.name}</TableCell>
//                 <TableCell>
//                   <div style={{ backgroundColor: nature.color, width: '20px', height: '20px' }}></div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Create Nature</DialogTitle>
//         <DialogContent>
//           <TextField label="Nature de congé" required value={name} onChange={handleNameChange} fullWidth margin="normal" />
//           <TextField label="Couleur" type="color" value={color} onChange={handleColorChange} fullWidth margin="normal" />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleCreateNature} color="primary">OK</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default TypeConge;








// import React, { useState } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from '@material-ui/core';
// import { Add, Edit, Delete } from '@mui/icons-material';

// const initialNatures = [
//   { id: 1, name: 'Congé annuel', color: '#008000' },
//   { id: 2, name: 'Congé maladie', color: '#FF0000' },
//   { id: 3, name: 'Congé maternité', color: '#800080' },
// ];

// const TypeConge = () => {
//   const [natures, setNatures] = useState(initialNatures);
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [color, setColor] = useState('#000000');
//   const [action, setAction] = useState('edit');
//   const [selectedNature, setSelectedNature] = useState(null);

//   const handleActionClick = (nature, action) => {
//     setSelectedNature(nature);
//     setAction(action);
//     setName(nature.name);
//     setColor(nature.color);
//     setOpen(true);
//   };

//   const handleEditNature = () => {
//     setNatures((prevNatures) =>
//       prevNatures.map((nature) => {
//         if (nature.id === selectedNature.id) {
//           return {
//             ...nature,
//             name,
//             color,
//           };
//         }
//         return nature;
//       })
//     );
//     setName('');
//     setColor('#000000');
//     handleClose();
//   };

//   const handleDeleteNature = (id) => {
//     setNatures((prevNatures) => prevNatures.filter((nature) => nature.id !== id));
//   };

//   const handleClickOpen = () => {
//     setAction('create');
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setSelectedNature(null);
//     setOpen(false);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleColorChange = (event) => {
//     setColor(event.target.value);
//   };

//   const handleCreateNature = () => {
//     setNatures((prevNatures) => [
//       ...prevNatures,
//       {
//         id: prevNatures.length + 1,
//         name,
//         color,
//       },
//     ]);
//     setName('');
//     setColor('#000000');
//     handleClose();
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleClickOpen}>
//         Create Nature
//       </Button>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Nature de congé</TableCell>
//               <TableCell>Couleur</TableCell>
//               <TableCell>Actions</TableCell>
//               </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.age}</TableCell>
//                 <TableCell>{row.email}</TableCell>
//                 <TableCell>{row.address}</TableCell>
//                 <TableCell>
//                   <IconButton aria-label="edit">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton aria-label="delete">
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       </div>
//     );
// }
// export default TypeConge;




















































// import { useEffect, useState } from "react";
// import axiosClient from "../axios-client";
// import { useStateContext } from "../Contexts/ContextProvider";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from '@material-ui/core';
// import { Add, Delete, Edit } from '@mui/icons-material';
// import { isEditMode  } from "editmode-react";
// import { Link } from "react-router-dom";

// const initialNatures = [
//   { id: 1, name: 'Congé annuel', color: 'green' },
//   { id: 2, name: 'Congé maladie', color: 'red' },
//   { id: 3, name: 'Congé maternité', color: 'purple' },
// ];

// const TypeConge = () => {
//   const [natures, setNatures] = useState(initialNatures);
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [color, setColor] = useState('#black');
//   const [natureToEdit, setNatureToEdit] = useState(null);

//   const handleClickOpen = (nature) => {
//     if (nature) {
//       setName(nature.name);
//       setColor(nature.color);
//       setNatureToEdit(nature);
//     } else {
//       setName('');
//       setColor('#000000');
//       setNatureToEdit(null);
//     }
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleColorChange = (event) => {
//     setColor(event.target.value);
//   };

//   const handleCreateNature = () => {
//     setNatures((prevNatures) => [
//       ...prevNatures,
//       {
//         id: prevNatures.length + 1,
//         name,
//         color,
//       },
//     ]);
//     setName('');
//     setColor('#000000');
//     handleClose();
//   };

//   const handleEditNature = () => {
//     setNatures((prevNatures) =>
//       prevNatures.map((nature) => (nature.id === natureToEdit.id ? { ...nature, name, color } : nature))
//     );
//     setName('');
//     setColor('black');
//     handleClose();
//   };

//   const handleDeleteNature = (natureToDelete) => {
//     setNatures((prevNatures) => prevNatures.filter((nature) => nature.id !== natureToDelete.id));
//   };
//   const [loading,setLoading]=useState(false);
//   const {user,setNotification}=useStateContext();
//   const [Conges,setConges]= useState([]);
  

//   useEffect(()=>{
//     getConge();
// },[])

//   const getConge=()=>{
//     setLoading(true);
//     axiosClient.get('/conges')
//     .then(({data})=>{
//       console.log(data);
//       setConges(data.data)
//         setLoading(false);
//     })
//     .catch(()=>{
//         setLoading(false);
//     })
// }
//   return (
//     <div>
//       <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
//                 <h1>Type Congés</h1>
//                 {user.role == 'super_admin' && <Link onClick={() => handleClickOpen(null)} className="btn-add">Add New</Link>}
//             </div>
//       {/* {user.role == 'super_admin' &&  */}
      
//       <div className="card animated fadeInDown">
//       <table>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Nature Conges</th>
//                             <th>Create Date</th>
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
//                         {Conges.map(u=>(
//                             <tr key={u.id}>
//                                 <td>{u.id}</td>
//                                 <td>{u.name}</td>
//                                 <td>{u.created_at}</td>
//                                 <td>
//                                     <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
//                                     &nbsp;
//                                     <button onClick={ev=>onDelete(u)}className="btn-delete">Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                     }
//                 </table>
//                 </div>
// <Dialog open={open} onClose={handleClose}>
//   <DialogTitle>{isEditMode ? 'Modifier la nature' : 'Créer une nature'}</DialogTitle>
//   <DialogContent>
//     <TextField label="Nature de congé" required value={name} onChange={handleNameChange} fullWidth margin="normal" />
//     <TextField label="Couleur" type="color" value={color} onChange={handleColorChange} fullWidth margin="normal" />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={handleClose}>Annuler</Button>
//     {isEditMode && (
//       <Button onClick={() => handleDeleteNature(natureToEdit)} color="secondary">
//         Supprimer
//       </Button>
//     )}
//     <Button onClick={natureToEdit ? handleEditNature : handleCreateNature} color="primary">
//       {isEditMode ? 'Modifier' : 'Créer'}
//     </Button>
//   </DialogActions>
// </Dialog>
// </div>
// );

       


// };
//   export default TypeConge;

































