import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

export default function ContratForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { user, setNotification } = useStateContext();
  const [contratValue, setContrat] = useState({
    id: "",
    name: "",
    soldec:"",
    autorisation:""
  });

  useEffect(() => {
    setLoading(true);
    if (user.role === "user") {
      navigate("/dashboard");
    } else {
      if (id) {
        axiosClient
          .get(`/contrats/${id}`)
          .then(({ data }) => {
            setLoading(false);
            setContrat(data.data);
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
    if (contratValue.id) {
      axiosClient
        .put(`/contrats/${contratValue.id}`, contratValue)
        .then(() => {
          setNotification("Contrat was updated successfully");
          navigate("/contrat");
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
        .post("/contrats", contratValue)
        .then(() => {
          setNotification("Contrat was created successfully");
          navigate("/contrat");
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
      {contratValue.id && <h1>Update Contrat : {contratValue.name}</h1>}
      {!contratValue.id && <h1>New Contrat</h1>}
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
                setContrat({ ...contratValue, name: ev.target.value })
              }
              value={contratValue.name}
              placeholder="Name"
            />
            <input
              type="number"
              onChange={(ev) =>
                setContrat({ ...contratValue, soldec: ev.target.value })
              }
              value={contratValue.soldec}
              placeholder="solde/jrs"
            />
             <input
              type="time"
              onChange={(ev) =>
                setContrat({ ...contratValue, autorisation: ev.target.value })
              }
              value={contratValue.autorisation}
              placeholder="autorisation/heure"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}