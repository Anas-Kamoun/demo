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
  const [PosteValue, setPoste] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    setLoading(true);
    if (user.role === "user") {
      navigate("/dashboard");
    } else {
      setLoading(true);
      if (id) {
        axiosClient
          .get(`/postes/${id}`)
          .then(({ data }) => {
            setLoading(false);
            setPoste(data.data);
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
    if (PosteValue.id) {
      axiosClient
        .put(`/postes/${PosteValue.id}`, PosteValue)
        .then(() => {
          setNotification("Poste was updated successfully");
          navigate("/postes");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/postes", PosteValue)
        .then(() => {
          setNotification("Poste was created successfully");
          navigate("/postes");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <div>
      {PosteValue.id && <h1>Update Poste : {PosteValue.name}</h1>}
      {!PosteValue.id && <h1>New Poste</h1>}
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
                setPoste({ ...PosteValue, name: ev.target.value })
              }
              value={PosteValue.name}
              placeholder="Name"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}