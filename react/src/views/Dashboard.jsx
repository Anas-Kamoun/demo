import Cardeverticalbar from "./Cardeverticalbar";
import { useStateContext } from "../Contexts/ContextProvider";
import "../views/css/style.css";
import "./css/DashCSS.css";
import {
  TeamOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import Carte from "./Carte";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axiosClient from "../axios-client";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const { user, setNotification } = useStateContext();
  const [count_contrats, setcount_contrats] = useState([]);
  const [count_post, setcount_post] = useState([]);

  const [count_users, setcount_users] = useState([]);
  const [count_demandes, setcount_demandes] = useState([]);
  const [count_demandesv, setcount_demandesv] = useState([]);
  const [count_demandesp, setcount_demandesp] = useState([]);
  useEffect(() => {
    
    getData();
  }, []);

  const getData = () => {
    axiosClient
      .get("/count-users")
      .then(({ data }) => {
        setcount_users(data);
      })
      .catch(() => {});
    axiosClient
      .get("/count-demandes")
      .then(({ data }) => {
        setcount_demandes(data.countall);
        setcount_demandesv(data.countv);
        setcount_demandesp(data.countp);
      })
      .catch(() => {});
    axiosClient
      .get("/count-contrats")
      .then(({ data }) => {
        setcount_contrats(data.count);
      })
      .catch(() => {});
    axiosClient
      .get("/count-post")
      .then(({ data }) => {
        setcount_post(data.count);
      })
      .catch(() => {});
  };

  const infos = [
    {
      title: <p className="pp">Total utilisateur</p>,
      icon: (
        <TeamOutlined
          style={{
            color: "blue",
            backgroundColor: "rgba(0,255,0,0.25)",
            borderRadius: 20,
            fontSize: 24,
            padding: 8
          }}
        />
      ),
      data: count_users
    },
    {
      title: <p className="pp">Total demande Congé</p>,
      icon: (
        <PlusCircleOutlined
          style={{
            color: "blue",
            backgroundColor: "rgba(0,0,255,0.25)",
            borderRadius: 20,
            fontSize: 24,
            padding: 8
          }}
        />
      ),
      data: count_demandes
    },
    {
      title: <p className="pp">Total contrats</p>,
      icon: (
        <CheckCircleOutlined
          style={{
            color: "purple",
            backgroundColor: "rgba(0,255,255,0.25)",
            borderRadius: 20,
            fontSize: 24,
            padding: 8
          }}
        />
      ),
      data: count_contrats
    },
    {
      title: <p className="pp">Total postes</p>,
      icon: (
        <SyncOutlined
          style={{
            color: "blue",
            backgroundColor: "rgba(25,10,0,0.25)",
            borderRadius: 20,
            fontSize: 24,
            padding: 8
          }}
        />
      ),
      data: count_post
    }
  ];

  const infobare = [
    {
      title: (
        <p className="ppp" style={{ marginLeft: "-35px" }}>
        </p>
      )
    }
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "15px"
        }}
      >
        <h1>Vue d'ensemble</h1>{" "}
      </div>
      <div className="all-mini-cart" style={{ marginLeft: "-15px" }}>
        {infos.map(items => (
          <Carte icon={items.icon} title={items.title} data={items.data} />
        ))}
      </div>
      &nbsp; &nbsp;
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "15px"
        }}
      >
        <h1>Dashboard</h1>{" "}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          marginLeft: "-15px",
          gap: "11px"
        }}
      >
        {infobare.map(items => (
          <Cardeverticalbar title={items.title} />
        ))}
      </div>
    </>
  );
}
export default Dashboard;
