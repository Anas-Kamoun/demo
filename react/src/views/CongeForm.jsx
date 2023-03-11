import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import {
    Button,Dialog,DialogActions,DialogContent,DialogTitle,IconButton,Table,TableBody,
    TableCell,TableContainer,TableHead,TableRow,TextField,
        } from '@material-ui/core';
        import { isEditMode  } from "editmode-react";
import { List } from "antd";

export default function ContratForm() {
    
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { user, setNotification } = useStateContext();
  //   const [userValue, setUser] = useState({
    const [congeValue, setConge] = useState({
      id: "",
      nature_conge: "",
      couleur:"",
      
    });
  
    useEffect(() => {
      setLoading(true);
      if (user.role === "user") {
        navigate("/dashboard");
      } else {
        if (id) {
          axiosClient
            .get(`/conges/${id}`)
            .then(({ data }) => {
              setLoading(false);
              setConge(data.data);
            })
            .catch(() => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      }
    }, [id, user]);
  
    const onSubmit = (ev) => {
      ev.preventDefault();
      if (congeValue.id) {
        axiosClient
          .put(`/conges/${congeValue.id}`, congeValue)
          .then(() => {
            setNotification("conges was updated successfully");
            navigate("/conges");
          })
          .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors);
              console.log(response.data.errors);
            }
          });
      } else {
        axiosClient
          .post("/conges", congeValue)
          .then(() => {
            setNotification("Conge was created successfully");
            navigate("/conge");
          })
          .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors);
              console.log(response.data.errors);
            }
          });
      }
    };




    const [color, setColor] = useState('#000000');


    const [natures, setNatures] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
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
        setColor('#000000');
        handleClose();
      };
    
      const handleDeleteNature = (natureToDelete) => {
        setNatures((prevNatures) => prevNatures.filter((nature) => nature.id !== natureToDelete.id));
      };




















  
    return (
      <div>
        {congeValue.id && <h1>Update conge : {congeValue.name}</h1>}
        {!congeValue.id && <h1>New conge</h1>}
        <div className="card animated fadeInDown">
          {loading && <div className="text-center">Loading...</div>}
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          {!loading && (
            <form onSubmit={onSubmit}>
              {/* <input
                type="text"
                onChange={(ev) =>
                  setConge({ ...congeValue, nature_conge: ev.target.value })
                }
                value={congeValue.nature_conge}
                placeholder="Name"
              /> */}




  <DialogContent>
  <FormControl fullWidth>
                <Select
                  fullWidth
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={congeValue.role}
                  placeholder="Role"
                  onChange={(ev) =>
                    setConge({
                      ...congeValue,
                      contrat: ev.target.value,
                    })
                  }
                >
                  <MenuItem value="" disabled>
                    Contrat ?
                  </MenuItem>
                  <MenuItem >CDD</MenuItem>
                  <MenuItem >CDI</MenuItem>
                  <MenuItem >CIVP</MenuItem>
                </Select>
              </FormControl>
    <TextField label="Nature de congé" required value={name} onChange={handleNameChange} fullWidth margin="normal" />
    <TextField label="Couleur" type="color" value={color} onChange={handleColorChange} fullWidth margin="normal" />
  </DialogContent>
  <br/>



  &nbsp;  &nbsp;
  &nbsp;   &nbsp;




              
              <button className="btn">Save</button>
            </form>
          )}
        </div>
      </div>
    );
  }