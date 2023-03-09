// import './css/NotFound.css'
// export default function NotFound(){
//     return(
//         <div className="NotFound">
//             <h1 className="NotFound-title">404 Not Found</h1>
//             <p className="NotFound-description">The requested page could not be found on the server.</p>
//         </div>
//     )
// }


// import { Button, Result } from 'antd';
// const App = () => (
//   <Result
//     status="404"
//     title="404"
//     subTitle="Sorry, the page you visited does not exist."
//     extra={<Button type="primary">Back Home</Button>}
//   />
// );
// export default App;


import React from 'react';
import { Button, Result } from 'antd';

const App = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default App;



































// import React, { useState } from 'react';
// import { useEffect, useState } from 'react';
// import * as React from 'react';
// import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@mui/material/MenuItem';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
//   search: {
//     marginRight: theme.spacing(2),
//   },
//   addButton: {
//     marginLeft: theme.spacing(2),
//   },
//   table: {
//     minWidth: 650,
//   },
//   formControl: {
//     margin: theme.spacing(1),
//   },
// }));

// function App() {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   const [selectedRadio, setSelectedRadio] = useState('demande');

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleRadioChange = (event) => {
//     setSelectedRadio(event.target.value);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             {/* add icon here */}
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             My App
//           </Typography>
//           <TextField className={classes.search} label="Search" variant="outlined" />
//           <Button className={classes.addButton} variant="contained" color="primary" onClick={handleOpen}>
//             Create Liste
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>RANK</TableCell>
//               <TableCell>SOLDE</TableCell>
//               <TableCell>TYPE</TableCell>
//               <TableCell>SELECT RANGE DATE & TIME</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell>1</TableCell>
//               <TableCell>10</TableCell>
//               <TableCell>Vacances</TableCell>
//               <TableCell>20/02/2023 10:00 - 22/02/2023 18:00</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>2</TableCell>
//               <TableCell>5</TableCell>
//               <TableCell>Maladie</TableCell>
//               <TableCell>18/02/2023 12:00 - 18/02/2023 18:00</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Create Liste</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please fill in the following fields:
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="solde"
//             label="Solde disponible"
//             type="number"
//             fullWidth
//           />
//           <TextField
//             select
//             margin="dense"
//             id="type-conge"
//             label="Type de Congé"
//             fullWidth
//           >
//             {/* /* add options for */}
//             <MenuItem value="Vacances">Vacances</MenuItem>
//           <MenuItem value="Maladie">Maladie</MenuItem>
//           <MenuItem value="Maternité">Maternité</MenuItem>
//           <MenuItem value="Paternité">Paternité</MenuItem>
//           <MenuItem value="Mariage">Mariage</MenuItem>
//           <MenuItem value="Décès">Décès</MenuItem>
//           <MenuItem value="Formation">Formation</MenuItem>
//           <MenuItem value="Autre">Autre</MenuItem>
//           </TextField>
//           <TextField
//             margin="dense"
//             id="datetime"
//             label="Select Date and Time"
//             type="datetime-local"
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             id="note"
//             label="Note"
//             fullWidth
//           />
//           <RadioGroup aria-label="etat" name="etat" value={selectedRadio} onChange={handleRadioChange}>
//             <FormControlLabel value="demande" control={<Radio />} label="Demande en cour" />
//             <FormControlLabel value="valide" control={<Radio />} label="Validé" />
//             <FormControlLabel value="rejete" control={<Radio />} label="Rejeté" />
//             <FormControlLabel value="annule" control={<Radio />} label="Annulé" />
//           </RadioGroup>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default App;