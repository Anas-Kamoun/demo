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
  const [userValue, setUser] = useState({});

  const [ContratValue, setContrat] = useState("");
  const [Contrats, setContrats] = useState([]);
  const currentContrat = Contrats.find(el => el.id === user.contrat_id) || {
    name: "",
    id: ""
  };
  const [PosteValue, setPoste] = useState("");
  const [Poste, setPostes] = useState([]);
  const currentPoste = Poste.find(el => el.id === user.poste_id) || {
    name: "",
    id: ""
  };
  useEffect(() => {
    setLoading(true);
    if (user.role === "user") {
      navigate("/dashboard");
    } else {
      if (user.id) {
        axiosClient
          .get(`/users/${user.id}`)
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
  }, [user]);

  const onSubmit = ev => {
    ev.preventDefault();
    console.log(userValue);
    axiosClient
      .put(`/users/${userValue.id}`, userValue)
      .then(() => {
        setNotification("Profile was updated successfully");
        navigate("/dashboard");
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div>
      <h1>Profile User : {userValue.name}</h1>
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
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
              placeholder="Name"
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
              placeholder="Password"
            />
            <input
              type="password"
              onChange={ev =>
                setUser({
                  ...userValue,
                  password_confirmation: ev.target.value
                })
              }
              placeholder="Password Confirmation"
            />
            <div>
              <FormControl fullWidth>
                <Select
                  disabled
                  fullWidth
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userValue.role}
                  placeholder="Role"
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
                  <MenuItem value={"user"}>Simple User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"super_admin"}>Super Admin</MenuItem>
                </Select>
              </FormControl>
              &nbsp;
              <br />
              <FormControl fullWidth>
                <Select
                  disabled
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
                  disabled
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
                    Type Postes ?
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
                placeholder="Numero Telephone"
              />
            </div>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
