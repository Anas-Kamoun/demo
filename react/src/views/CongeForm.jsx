import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

export default function CongeForm() {
  const navigate = useNavigate();
   const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { user, setNotification } = useStateContext();
  const [CongeValue, setConge] = useState({
    id: "",
    name: "",
    id_contrat:"",

  })

  // const [CongeValue, setConge] = useState("");



  const [ContratValue, setContrat] = useState('')
  const [contrats,setContrats] = useState([])
      
  useEffect(() => {
    setLoading(true);
    if (user.role === "user") {
      navigate("/dashboard");
    } else {
      axiosClient
      .get(`/contrats/`)
      .then(({ data }) => {
        setLoading(false);
        setContrats(data.data);
        console.log("aaa" ,data.data)
      })
      if (id) {
        axiosClient
          .get(`/conges/${id}`)
          .then(({ data }) => {
            setLoading(false);
            setContrats(data.data);
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
    if (CongeValue.id) {
      axiosClient
        .put(`/conges/${userValue.id}`, userValue)
        .then(() => {
          setNotification("User was updated successfully");
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
      axiosClient
        .post(`/conges/`, CongeValue)
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
                setConge( {
                  ...CongeValue,
                  name:ev.target.value })
              }
              value={CongeValue.name}
              placeholder="Name"
            />
            <div>
              <FormControl fullWidth>
                <Select
                  fullWidth
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ContratValue}
                  placeholder="type contrat"
                  onChange={(ev) =>
                    setConge({
                      ...CongeValue,
                      id_contrat: ev.target.value,
                    },
                    setContrat(ev.target.value),)
                  }
                >
                  <MenuItem value="" disabled>
                  Type contrat ?
                  </MenuItem>
              {contrats.map(c => {
                return(
                  <MenuItem value={c.id} key={c.id}>
                  {c.name}
                  </MenuItem>
                )
              })}
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
