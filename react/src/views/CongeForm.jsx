import * as React from 'react';
import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CongeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const { user, setNotification } = useStateContext();
  const [CongeValue, setConge] = useState({
    name: "",
    contrat_id: null, // Remplacer par null pour le moment
  });
  const [ContratValue, setContrat] = useState("");
  const [contrats, setContrats] = useState([]);
  const currentContrat = useState([]);

  const theme = useTheme();
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
    const [personName, setPersonName] = React.useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

  useEffect(() => {
    setLoading(true);
    if (user.role === "user") {
      navigate("/dashboard");
    } else {
      axiosClient.get(`/contrats/`).then(({ data }) => {
        setLoading(false);
        setContrats(data.data);
        console.log(data.data);
      });
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
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (CongeValue.id) {
      axiosClient
        .put(`/conges/${CongeValue.id}`, CongeValue)
        .then(() => {
          setNotification("Conge was updated successfully");
          navigate("/conge");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
            console.log(response.data.errors);
          }
        });
    } else {
  //     axiosClient
  //       .post(`/conges/`, CongeValue)
  //       .then(() => {
  //         setNotification("Conge was created successfully");
  //         navigate("/conge");
  //       })
  //       .catch((err) => {
  //         const response = err.response;
  //         if (response && response.status === 422) {
  //           setErrors(response.data.errors);
  //           console.log(response.data.errors);
  //         }
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // };
if (personName.length > 0) { // Vérifiez si une valeur est sélectionnée pour le contrat
      const contratId = contrats.find((contrat) => contrat.name === personName[0])?.id;
      if (contratId) {
        const newCongeValue = { ...CongeValue, contrat_id: contratId };
        axiosClient
          .post(`/conges/`, newCongeValue)
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
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        console.log("Invalid contrat selected");
      }
    } else {
      console.log("No contrat selected");
    }
  }
};
  return (
    <div>
      {CongeValue.id && <h1>Update Conge : {CongeValue.name}</h1>}
      {!CongeValue.id && <h1>New Conge</h1>}
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
            <input
              type="text"
              onChange={(ev) =>
                setConge({
                  ...CongeValue,
                  name: ev.target.value,
                })
              }
              value={CongeValue.name}
              placeholder="Name"
            />
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {contrats.map((name) => (
            <MenuItem
              key={name.id}
              value={name.name}
              style={getStyles(name.name, personName, theme)}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
              </FormControl>
              &nbsp;
              <br />
            </div>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
