import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { user, setNotification } = useStateContext();
  const [userValue, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
    poste_id: "",
    contrat_id: ""
  });

  const [ContratValue, setContrat] = useState("");
  const [Contrats, setContrats] = useState([]);
  const currentContrat = Contrats.find(
    el => el.id === userValue.contrat_id
  ) || {
    name: "",
    id: ""
  };
  const [PosteValue, setPoste] = useState("");
  const [Poste, setPostes] = useState([]);
  const currentPoste = Poste.find(el => el.id === userValue.poste_id) || {
    name: "",
    id: ""
  };
  useEffect(() => {
    setLoading(true);
    if (user.role != "super_admin") {
      navigate("/dashboard");
    } else {
      if (id) {
        axiosClient
          .get(`/users/${id}`)
          .then(({ data }) => {
            setLoading(false);
            setUser(data.data);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
    axiosClient
      .get("/contrats")
      .then(({ data }) => {
        setLoading(false);
        setContrats(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
    axiosClient
      .get("/postes")
      .then(({ data }) => {
        setLoading(false);
        setPostes(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id, user]);

  const onSubmit = ev => {
    ev.preventDefault();
    if (userValue.id) {
      axiosClient
        .put(`/users/${userValue.id}`, userValue)
        .then(() => {
          setNotification("User was updated successfully");
          navigate("/users");
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
            console.log(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post(`/users`, userValue)
        .then(() => {
          setNotification("Utilisateur créer avec succés");
          navigate("/users");
        })
        .catch(err => {
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
      {userValue.id && <h1>Modifier Utilisateur : {userValue.name}</h1>}
      {!userValue.id && <h1>Nouveau Utilisateur</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Chargement...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={ev => setUser({ ...userValue, name: ev.target.value })}
              value={userValue.name}
              placeholder="Nom"
            />
            <input
              type="email"
              onChange={ev =>
                setUser({
                  ...userValue,
                  email: ev.target.value
                })
              }
              value={userValue.email}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={ev =>
                setUser({
                  ...userValue,
                  password: ev.target.value
                })
              }
              placeholder="Mot de passe"
            />
            <input
              type="password"
              onChange={ev =>
                setUser({
                  ...userValue,
                  password_confirmation: ev.target.value
                })
              }
              placeholder="Confirmation mot passe"
            />
            <div>
              <FormControl fullWidth>
                <Select
                  fullWidth
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userValue.role}
                  placeholder="Rôle"
                  onChange={ev =>
                    setUser({
                      ...userValue,
                      role: ev.target.value
                    })
                  }
                >
                  <MenuItem value="" disabled>
                    Role ?
                  </MenuItem>
                  <MenuItem value={"user"}>Utilisateur</MenuItem>
                  <MenuItem value={"admin"}>Administrateur</MenuItem>
                  <MenuItem value={"super_admin"}>
                    Super-administrateur
                  </MenuItem>
                </Select>
              </FormControl>
              &nbsp;
              <br />
              <FormControl fullWidth>
                <Select
                  fullWidth
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentContrat.id}
                  placeholder="type contrat"
                  onChange={ev =>
                    setUser(
                      {
                        ...userValue,
                        contrat_id: ev.target.value
                      },
                      setContrat(ev.target.value)
                    )
                  }
                >
                  <MenuItem value="" disabled>
                    Type contrat ?
                  </MenuItem>
                  {Contrats.map(c => {
                    return (
                      <MenuItem value={c.id} key={c.id}>
                        {c.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              &nbsp;
              <FormControl fullWidth>
                <Select
                  fullWidth
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentPoste.id}
                  placeholder="type contrat"
                  onChange={ev =>
                    setUser(
                      {
                        ...userValue,
                        poste_id: ev.target.value
                      },
                      setPoste(ev.target.value)
                    )
                  }
                >
                  <MenuItem value="" disabled>
                    Type postes ?
                  </MenuItem>
                  {Poste.map(c => {
                    return (
                      <MenuItem value={c.id} key={c.id}>
                        {c.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              &nbsp;
              <input
                type="tel"
                maxLength={"8"}
                onChange={ev =>
                  setUser({
                    ...userValue,
                    tel: ev.target.value
                  })
                }
                placeholder="Numéro de téléphone"
              />
            </div>
            <button className="btn">Enregistrer</button>
          </form>
        )}
      </div>
    </div>
  );
}
