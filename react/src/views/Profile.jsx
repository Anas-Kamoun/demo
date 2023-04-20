
Mehdi
Mehdi Zaghmi
import { Avatar, FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

export default function UserForm() {
  const navigate = useNavigate();
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
    avatar: null,
  });

  useEffect(() => {
    setLoading(true);
    if (user.id) {
      axiosClient
        .get(/users/${user.id})
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
  }, [user]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("name", userValue.name);
    formData.append("email", userValue.email);
    formData.append("password", userValue.password);
    formData.append("password_confirmation", userValue.password_confirmation);
    formData.append("avatar", userValue.avatar);
    if (userValue.id) {
      axiosClient
        .put(/users/${userValue.id}, formData)
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
        .post(/users/, formData)
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

  const onAvatarChange = (ev) => {
    setUser({ ...userValue, avatar: ev.target.files[0] });
  };

  return (
    <div>
      {userValue.id && <h1>Profile User : {userValue.name}</h1>}
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={userValue.avatar && URL.createObjectURL(userValue.avatar)}
              />
              <div style={{ marginLeft: "1rem" }}>
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("avatar-upload").click()
                  }
                  style={{ fontSize: "0.8rem" }}
                >
                  Edit Avatar
                </button>
                <input
                  type="file"
                  onChange={(ev) => {
                    const file = ev.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setUser({
                        ...userValue,
                        avatar: reader.result,
                      });
                    };
                  }}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="avatar-upload"
                />
              </div>
            </div>
            &nbsp;
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
                  Position ?
                </MenuItem>
                <MenuItem value={"Designer"}>Simple User</MenuItem>
                <MenuItem value={"Frontend developer"}>Admin</MenuItem>
                <MenuItem value={"Backend developer"}>Super Admin</MenuItem>
              </Select>
            </FormControl>
            &nbsp;
            <input
              type="tel"
              onChange={(ev) =>
                setUser({
                  ...userValue,
                  phone_number: ev.target.value,
                })
              }
              value={userValue.phone_number}
              placeholder="Phone number"
            />
            <button className="btn" type="submit">
              Save
            </button>

          </form>
        )}
      </div>
    </div>
  );
}