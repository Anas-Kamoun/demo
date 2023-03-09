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
  });

  useEffect(() => {
    setLoading(true);
    if (user.role === "user") {
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
  }, [id, user]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (userValue.id) {
      axiosClient
        .put(`/users/${userValue.id}`, userValue)
        .then(() => {
          setNotification("User was updated successfully");
          navigate("/users");
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
        .post(`/users/`, userValue)
        .then(() => {
          setNotification("User was created successfully");
          navigate("/users");
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
      {userValue.id && <h1>Update User : {userValue.name}</h1>}
      {!userValue.id && <h1>New User</h1>}
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
                setUser({ ...userValue, name: ev.target.value })
              }
              value={userValue.name}
              placeholder="Name"
            />
            <input
              type="email"
              onChange={(ev) =>
                setUser({
                  ...userValue,
                  email: ev.target.value,
                })
              }
              value={userValue.email}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(ev) =>
                setUser({
                  ...userValue,
                  password: ev.target.value,
                })
              }
              placeholder="Password"
            />
            <input
              type="password"
              onChange={(ev) =>
                setUser({
                  ...userValue,
                  password_confirmation: ev.target.value,
                })
              }
              placeholder="Password Confirmation"
            />
            <div>
              <FormControl fullWidth>
                <Select
                  fullWidth
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userValue.role}
                  placeholder="Role"
                  onChange={(ev) =>
                    setUser({
                      ...userValue,
                      role: ev.target.value,
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
            </div>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
