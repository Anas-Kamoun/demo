import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import {
  TextField,
  Modal,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [type, setType] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Demande en cours");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleClickOpen = (u) => {
    setSelectedUser(u);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = () => {
    const newRequest = {
      type,
      note,
      status,
      startDate,
      endDate,
    };

    axiosClient.post("/requests", newRequest)
      .then(() => {
        setNotification("Request was created successfully");
        handleClose();
        getUsers();
      })
      .catch(() => {
        setNotification("Error creating request");
      });
  };

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

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Liste des demandes de Congés</h2>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Ajouter
        </Button>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Solde</th>
              <th>Date Début</th>
              <th>Date Fin</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
        </td>
        </tr>
        </tbody>
          )}
        </table>
        </div>
                  {open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ajouter une nouvelle demande de congé</DialogTitle>
          <DialogContent>
            <form>
              <div>
                <TextField
                  id="type"
                  label="Type de congé"
                  select
                  fullWidth
                  variant="outlined"
                  margin="normal"
                >
                  <MenuItem value="congé annuel">Congé annuel</MenuItem>
                  <MenuItem value="congé maladie">Congé maladie</MenuItem>
                  <MenuItem value="congé maternité">Congé maternité</MenuItem>
                </TextField>
              </div>
              <div>
                <TextField
                  id="date-debut"
                  label="Date de début"
                  type="date"
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  id="date-fin"
                  label="Date de fin"
                  type="date"
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  id="note"
                  label="Note"
                  multiline
                  minRows={4}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </div>
              <div>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Etat</FormLabel>
                  <RadioGroup
                    row
                    aria-label="etat"
                    name="etat"
                    defaultValue="demande en cours"
                  >
                    <FormControlLabel
                      value="demande en cours"
                      control={<Radio />}
                      label="Demande en cours"
                    />
                    <FormControlLabel
                      value="validé"
                      control={<Radio />}
                      label="Validé"
                    />
                    <FormControlLabel
                      value="rejeté"
                      control={<Radio />}
                      label="Rejeté"
                    />
                    <FormControlLabel
                      value="annulé"
                      control={<Radio />}
                      label="Annulé"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleClose} color="primary" variant="contained">
              Soumettre
            </Button>
          </DialogActions>
        </Dialog>
      )}
</div> 
)}

