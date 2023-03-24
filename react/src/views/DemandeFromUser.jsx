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
  const [CongeValue, setConge] = useState({
    user_id:"",
    contrat_id: "",
    conge_id:"",
  });
  const [ContratValue, setContrat] = useState("");
  const [contrats, setContrats] = useState([]);
  const currentContrat = contrats.find(
    (el) => el.id === CongeValue.contrat_id
  ) || {
    name: "",
    id: "",
  };

  useEffect(() => {
    setLoading(true);
    if (user.role === "user") {
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

  // const onSubmit = (ev) => {
  //   ev.preventDefault();
  //   if (CongeValue.id) {
  //     axiosClient
  //       .put(`/conges/${CongeValue.id}`, CongeValue)
  //       .then(() => {
  //         setNotification("Conge was updated successfully");
  //         navigate("/conge");
  //       })
  //       .catch((err) => {
  //         const response = err.response;
  //         if (response && response.status === 422) {
  //           setErrors(response.data.errors);
  //           console.log(response.data.errors);
  //         }
  //       });
  //   } else {
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
  //       });
  //   }
  // };

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
                <Select
                  fullWidth
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentContrat.id}
                  placeholder="type contrat"
                  onChange={(ev) =>
                    setConge(
                      {
                        ...CongeValue,
                        contrat_id: ev.target.value,
                      },
                      setContrat(ev.target.value)
                    )
                  }
                >
                  <MenuItem value="" disabled>
                    Type contrat ?
                  </MenuItem>
                  {contrats.map((c) => {
                    return (
                      <MenuItem value={c.id} key={c.id}>
                        {c.name}
                      </MenuItem>
                    );
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
