import { useState, useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import "./style.css";
import DashboardIcon from "@mui/icons-material/Dashboard";

import AdjustIcon from "@mui/icons-material/Adjust";
import { Stack, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import Logo from "../assets/logo.png";

import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from "mdb-react-ui-kit";

export default function DefaultLayout() {
  const { user, token, notification, setUser, setToken } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setUser(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = () => {
    navigate("profile");
  };

  const handleLogout = () => {
    axiosClient
      .post("/logout")
      .then(() => {
        setUser({});
        setToken(null);
      })
      .catch(error => {
        console.log(error);
      });
  };
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">
          <Stack direction="row" alignItems="center">
            <DashboardIcon className="link-icons" />
            <span className="link-text">Dashboard</span>
          </Stack>
        </Link>
        {user.role == "super_admin" && (
          <Link to="/users">
            <Stack direction="row" alignItems="center">
              <AccountBoxIcon className="link-icons" />
              <span className="link-text">Utilisateurs</span>
            </Stack>
          </Link>
        )}
        {user.role != "user" && (
          <Link to="/demande">
            <Stack direction="row" alignItems="center">
              <AdjustIcon style={{ marginRight: 5 }} />
              <span className="link-text">Demandes congés</span>
            </Stack>
          </Link>
        )}
        {user.role == "super_admin" && (
          <Link to="/conge">
            <Stack direction="row" alignItems="center">
              <AccountBalanceSharpIcon className="link-icons" />
              <span className="link-text">Types congés</span>
            </Stack>
          </Link>
        )}
        {user.role == "super_admin" && (
          <Link to="/contrat">
            <Stack direction="row" alignItems="center">
              <AssignmentIcon className="link-icons" />
              <span className="link-text">Types contrats</span>
            </Stack>
          </Link>
        )}
        {user.role != "user" && (
          <Link to="/postes">
            <Stack direction="row" alignItems="center">
              <AccessibilityNewIcon className="link-icons" />
              <span className="link-text">Types postes</span>
            </Stack>
          </Link>
        )}

        {user.role != "super_admin" && (
          <Link to="/demandeuser">
            <Stack direction="row" alignItems="center">
              <AdjustIcon className="link-icons" />
              <span className="link-text">Demander un congé</span>
            </Stack>
          </Link>
        )}
      </aside>
      <div className="content">
        <header>
          <div>
            <Stack direction="row" alignItems="center">
              <img
                src={Logo}
                width="70"
                alt="logo"
                style={{ marginRight: 5 }}
              />{" "}
              &nbsp;
              <h1>GRH</h1>
            </Stack>
          </div>

          <div>
            <IconButton onClick={handleMenuClick}>
              <Avatar />
              &nbsp;
              {user.name}
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfileClick}>Profil</MenuItem>
              <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
            </Menu>
          </div>
        </header>
        <main style={{ minHeight: "80vh" }}>
          <Outlet />
        </main>
        <MDBFooter
          className="bg-light text-center text-white"
          style={{ justifySelf: "self-end" }}
        >
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2023 Copyright:&nbsp;
            <a className="text-white" href="https://www.comunikcrm.com/">
              ComunikCRM
            </a>
          </div>
        </MDBFooter>
      </div>
      {notification && <div className="notification">{notification}</div>}{" "}
    </div>
  );
}
