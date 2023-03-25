import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

export default function CongeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const { user, setNotification } = useStateContext();
  const [DCongeeValue, setConge] = useState({
    user_id: "",
    contrat_id: "",
    conge_id: "",
    autorisation:"",
    TypeCongee:"",
  });
  const [contrats, setContrats] = useState([]);
  const currentContrat = contrats.find((el) => el.id === user.contrat_id) || {
    name: "",
    id: "",
  };

  useEffect(() => {
    setLoading(true);
    if ((user.role = !"user")) {
      navigate("/dashboard");
    } else {
      axiosClient.get(`/contrats/`).then(({ data }) => {
        setLoading(false);
        setContrats(data.data);
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
    // ev.preventDefault();
    // if (CongeValue.id) {
    //   axiosClient
    //     .put(`/conges/${CongeValue.id}`, CongeValue)
    //     .then(() => {
    //       setNotification("Conge was updated successfully");
    //       navigate("/conge");
    //     })
    //     .catch((err) => {
    //       const response = err.response;
    //       if (response && response.status === 422) {
    //         setErrors(response.data.errors);
    //         console.log(response.data.errors);
    //       }
    //     });
    // } else {
    //   axiosClient
    //     .post(`/conges/`, CongeValue)
    //     .then(() => {
    //       setNotification("Conge was created successfully");
    //       navigate("/conge");
    //     })
    //     .catch((err) => {
    //       const response = err.response;
    //       if (response && response.status === 422) {
    //         setErrors(response.data.errors);
    //         console.log(response.data.errors);
    //       }
    //     });
    // }
  };

  return (
    <div>
      {DCongeeValue.id && <h1>Update Conge : {DCongeeValue.name}</h1>}
      {!DCongeeValue.id && <h1>New Demande Conge</h1>}
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
            <div>
              <h3>Votre Solde ({user.solde}jr|{user.autorisation}h) Votre Contrat ({currentContrat.name})</h3>
              <br />
            </div>
            <div>
            <FormControl fullWidth>
                <Select
                  fullWidth
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={DCongeeValue.TypeCongee}
                  placeholder="TypeCongee"
                  onChange={(ev) =>
                    setConge({
                      ...DCongeeValue,
                      TypeCongee: ev.target.value,
                    })
                  }
                >
                  <MenuItem value="" disabled>
                    Type Congee ?
                  </MenuItem>
                  <MenuItem value={"autorisation"}>Autorisation</MenuItem>
                  <MenuItem value={"Congee"}>Congee</MenuItem>
                </Select>
              </FormControl>
              &nbsp;
              <br />
              {DCongeeValue.TypeCongee==="autorisation" &&
              <input
              type="number" min="0"
              onChange={(ev) =>
                setConge({
                  ...DCongeeValue,
                  autorisation: ev.target.value,
                })
              }
              placeholder="Nombre d'heure"
            />
              }
              {DCongeeValue.TypeCongee==="Congee" &&<h1>Update Conge</h1>}
            </div>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
