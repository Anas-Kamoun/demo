// import {TeamOutlined ,SyncOutlined ,CheckCircleOutlined,PlusCircleOutlined } from "@ant-design/icons";
// import { Card, Space, Statistic, Table, Typography } from "antd";
// import { useEffect, useState } from "react";

// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

// function Dashboard() {
//   const [orders, setOrders] = useState(0);
//   const [inventory, setInventory] = useState(0);
//   const [customers, setCustomers] = useState(0);
//   const [revenue, setRevenue] = useState(0);

//   useEffect(() => {
//     // getOrders().then((res) => {
//     //   setOrders(res.total);
//     //   setRevenue(res.discountedTotal);
//     // });
//     // getInventory().then((res) => {
//     //   setInventory(res.total);
//     // });
//     // getCustomers().then((res) => {
//     //   setCustomers(res.total);
//     // });
//   }, []);

//   return (
//     <Space size={20} direction="vertical">
//       <Typography.Title level={4}>Dashboard and statistics</Typography.Title>
//       <Space direction="horizontal">
//         <DashboardCard
//           icon={
//             <TeamOutlined 
//               style={{
//                 color: "blue",
//                 backgroundColor: "rgba(0,255,0,0.25)",
//                 borderRadius: 20,
//                 fontSize: 24,
//                 padding: 8,
//               }}
//             />
//           }
//           title={"Users"}
//           value={orders}
//         />
//         <DashboardCard
//           icon={
//             <PlusCircleOutlined 
//               style={{
//                 color: "blue",
//                 backgroundColor: "rgba(0,0,255,0.25)",
//                 borderRadius: 20,
//                 fontSize: 24,
//                 padding: 8,
//               }}
//             />
//           }
//           title={"Demande congés"}
//           value={inventory}
//         />
//         <DashboardCard
//           icon={
//             <CheckCircleOutlined 
//               style={{
//                 color: "purple",
//                 backgroundColor: "rgba(0,255,255,0.25)",
//                 borderRadius: 20,
//                 fontSize: 24,
//                 padding: 8,
//               }}
//             />
//           }
//           title={"Congés acceptés"}
//           value={customers}
//         />
//         <DashboardCard
//           icon={
//             <SyncOutlined 
//               style={{
//                 color: "blue",
//                 backgroundColor: "rgba(25,10,0,0.25)",
//                 borderRadius: 20,
//                 fontSize: 24,
//                 padding: 8,
//               }}
//             />
//           }
//           title={"Congés en cours"}
//           value={revenue}
//         />
//       </Space>
//       <Space>
//         <RecentOrders />
//         <DashboardChart />
//       </Space>
//     </Space>
//   );
// }

// function DashboardCard({ title, value, icon }) {
//   return (
//     <Card>
//       <Space direction="horizontal">
//         {icon}
//         <Statistic title={title} value={value} />
//       </Space>
//     </Card>
//   );
// }
// function RecentOrders() {
//   const [dataSource, setDataSource] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     // getOrders().then((res) => {
//     //   setDataSource(res.products.splice(0, 3));
//     //   setLoading(false);
//     // });
//   }, []);

//   return (
//     <>
//       <Typography.Text>Recent Orders</Typography.Text>
//       <Table
//         columns={[
//           {
//             title: "Nom",
//             dataIndex: "nom",
//           },
//           {
//             title: "Email",
//             dataIndex: "email",
//           },
//           {
//             title: "Date",
//             dataIndex: "date",
//           },
//           {
//             title: "Solde",
//             dataIndex: "solde",
//           },
//         ]}
//         loading={loading}
//         dataSource={dataSource}
//         pagination={false}
//       ></Table>
//     </>
//   );
// }

// function DashboardChart() {
//   const [reveneuData, setReveneuData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     // getRevenue().then((res) => {
//     //   const labels = res.carts.map((cart) => {
//     //     return `User-${cart.userId}`;
//     //   });
//     //   const data = res.carts.map((cart) => {
//     //     return cart.discountedTotal;
//     //   });

//     //   const dataSource = {
//     //     labels,
//     //     datasets: [
//     //       {
//     //         label: "Revenue",
//     //         data: data,
//     //         backgroundColor: "rgba(255, 0, 0, 1)",
//     //       },
//     //     ],
//     //   };

//     //   setReveneuData(dataSource);
//     // });
//   }, []);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       title: {
//         display: true,
//         text: "Total des demandes acceptés ",
//       },
//     },
//   };

//   return (
//     <Card style={{ width: 500, height: 250 }}>
//       <Bar options={options} data={reveneuData} />
//     </Card>
    
//   );
  
// }


// export default Dashboard;






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
    //titre
    // api: "0",
    // api2: "0",
    // api3: "0"
  },

  {
    title: <p className='ppp' style={{ marginLeft: "-35px" }}>Super administrateur</p>,
 
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