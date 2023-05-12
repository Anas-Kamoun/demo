import Cardeverticalbar from "./Cardeverticalbar";
import  "../views/css/style.css";
import"./css/DashCSS.css";
import {TeamOutlined ,SyncOutlined ,CheckCircleOutlined,PlusCircleOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import Carte from "./Carte";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from "chart.js";
import { Bar } from "react-chartjs-2";
import axiosClient from "../axios-client";
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);


function Dashboard() {
  const [count_users,setcount_users]= useState([]);
  const [count_demandes,setcount_demandes]= useState([]);
  const [count_demandesv,setcount_demandesv]= useState([]);
  const [count_demandesp,setcount_demandesp]= useState([]);
  useEffect(()=>{
    getData();
},[])

const getData=()=>{
  axiosClient.get('/count-users')
  .then(({data})=>{
    setcount_users(data);
  })
  .catch(()=>{
  })
  axiosClient.get('/count-demandes')
  .then(({data})=>{
    setcount_demandes(data.countall);
    setcount_demandesv(data.countv);
    setcount_demandesp(data.countp);
  })
  .catch(()=>{
  })
}

const infos = [
  {
    title: <p className='pp'>Total Users</p>,
    icon: <TeamOutlined
                    style={{
                color: "blue",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
    
    
    />,
    data: count_users,
  },
  {
    title: <p className='pp'>Total Demande Congee</p>,
    icon: <PlusCircleOutlined 
                style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
    
    />,
    data: count_demandes,
  },
  {
    title: <p className='pp'>Demande Congee Validee</p>,
    icon: <CheckCircleOutlined 
                style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}

    />,
    data: count_demandesv,
  },
  {
    title: <p className='pp'>Demande Congee En Cours</p>,
    icon: <SyncOutlined 
    
                  style={{
                color: "blue",
                backgroundColor: "rgba(25,10,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
    
    />,
    data: count_demandesp,
  },
 
]

const infobare = [
  {
    title: <p className='ppp' style={{ marginLeft: "-35px" }}>Administrateur</p>,
    
  },
]


return (<>
  <div className='all-mini-cart' style={{marginLeft:"-15px"}} >
              {
                infos.map((items) =>
                  <Carte icon={items.icon} title={items.title} data={items.data} />
                )
              }

  </div>

  <div style={{ display: "flex", marginTop: "10px" , marginLeft:"-15px", gap:"11px" }}>
                  {
                    infobare.map((items) =>
                      <Cardeverticalbar title={items.title}  />

                    )

                  }

  </div>
                </>

)
}
export default Dashboard;