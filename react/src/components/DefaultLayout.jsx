// import { useEffect } from "react";
// import { Link, Navigate, Outlet } from "react-router-dom";
// import axiosClient from "../axios-client";
// import { useStateContext } from "../Contexts/ContextProvider";
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import AccountBalanceSharpIcon from '@mui/icons-material/AccountBalanceSharp'
// import AssignmentIcon from '@mui/icons-material/Assignment';


// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AdjustIcon from '@mui/icons-material/Adjust';
// import { Stack } from "@mui/material";
// import Logo from "../assets/logo.png"
// export default function DefaultLayout(){

//     const {user,token,notification,setUser,setToken}=useStateContext()
//     if(!token){
//         return<Navigate to="/login"/>  
//     }
// console.log(user)
//     useEffect(()=>{
//         axiosClient.get('/user')
//         .then(({data})=>{
//             setUser(data)
//         })
//     },[])

//     const onLogout=(ev)=>{
//         ev.preventDefault()
//         axiosClient.post('/logout')
//         .then(()=>{
//             setUser({})
//             setToken(null)
//         })

//     }

//     return(
//         <div id="defaultLayout">
//             <aside>


                // <Link to="/dashboard">
                // <Stack direction="row" alignItems='center'>
                //     <DashboardIcon style={{marginRight:5}} />
                //             Dashboard
                //     </Stack>
                // </Link>


                // <Link to="/users">
                //     <Stack direction="row" alignItems='center'>
                //     <AccountBoxIcon style={{marginRight:5}} />
                //             Users
                //     </Stack>
                // </Link>


//                 <Link to="/demande">
//                 <Stack direction="row" alignItems='center'>
//                     <AdjustIcon style={{marginRight:5}} />
//                              Demandes de Congés
//                     </Stack>
//                 </Link>


                // <Link to="/conge">
                // <Stack direction="row" alignItems='center'>
                //     <AccountBalanceSharpIcon style={{marginRight:5}} />
                //              Types de congés
                //     </Stack>
                // </Link>


                // <Link to="/contrat">
                // <Stack direction="row" alignItems='center'>
                //     <AssignmentIcon style={{marginRight:5}} />
                //              Types de contrats
                //     </Stack>
                // </Link>



//             </aside>

//             <div className="content">
//                 <header>
//                     <div>
//                     <Stack direction="row" alignItems='center'>
//                     <img src={Logo} width="70" alt="logo" style={{marginRight:5}} /> &nbsp;
//                     <h1>GRH</h1>
//                     </Stack>
                        
                        
//                     </div>
//                     <div>
//                         {user.name} &nbsp; &nbsp;
//                         <a className="btn-logout" href="#" onClick={onLogout}>Logout</a>
//                     </div>
//                 </header>
//                 <main>
//                     <Outlet/>
//                 </main>
//             </div>
//             { notification && <div className="notification">
//                 {notification}
//             </div>
//             }
//         </div>
//     )
// }








// import { useEffect, useState } from "react";
// import { Link, Navigate, Outlet } from "react-router-dom";
// import axiosClient from "../axios-client";
// import { useStateContext } from "../Contexts/ContextProvider";
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import AccountBalanceSharpIcon from '@mui/icons-material/AccountBalanceSharp'
// import AssignmentIcon from '@mui/icons-material/Assignment';


// import DashboardIcon from '@mui/icons-material/Dashboard';

// import AdjustIcon from '@mui/icons-material/Adjust';
// import { Stack, Avatar, Menu, MenuItem } from "@mui/material";
// import Logo from "../assets/logo.png";

// export default function DefaultLayout() {
//   const { user, token, notification, setUser, setToken } = useStateContext();
//   const [anchorEl, setAnchorEl] = useState(null);

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   useEffect(() => {
//     axiosClient.get('/user')
//       .then(({ data }) => {
//         setUser(data);
//       });
//   }, []);

//   const handleLogout = (ev) => {
//     ev.preventDefault();
//     axiosClient.post('/logout')
//       .then(() => {
//         setUser({});
//         setToken(null);
//       });
//   };





  

//   const handleProfileClick = () => {
//     // Navigate to the user's profile page
//   };

//   const handleAvatarClick = (ev) => {
//     setAnchorEl(ev.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div id="defaultLayout">
//       <aside>
//         <Link to="/dashboard">
//             <Stack direction="row" alignItems='center'>
//                 <DashboardIcon style={{marginRight:5}} />
//                     Dashboard
//             </Stack>
//         </Link>

//         <Link to="/users">
//             <Stack direction="row" alignItems='center'>
//                 <AccountBoxIcon style={{marginRight:5}} />
//                     Users
//             </Stack>
//         </Link>




//         <Link to="/demande">
//           <Stack direction="row" alignItems='center'>
//                 <AdjustIcon style={{ marginRight: 5 }} />
//                     Demandes de Congés
//           </Stack>
//         </Link>


//         <Link to="/conge">
//             <Stack direction="row" alignItems='center'>
//                 <AccountBalanceSharpIcon style={{marginRight:5}} />
//                     Types de congés
//             </Stack>
//         </Link>


//         <Link to="/contrat">
//             <Stack direction="row" alignItems='center'>
//                 <AssignmentIcon style={{marginRight:5}} />
//                     Types de contrats
//             </Stack>
//         </Link>



//       </aside>

//       <div className="content">
//         <header>
//           <div>
//             <Stack direction="row" alignItems='center'>
//               <img src={Logo} width="70" alt="logo" style={{ marginRight: 5 }} />
//               <h1>GRH</h1>
//             </Stack>
//           </div>
//           <div>
//             <Avatar src={user.avatar} onClick={handleAvatarClick} />
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//             >
//               <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </div>
//         </header>
//         <main>
//           <Outlet />
//         </main>
//       </div>
//       {notification && (
//         <div className="notification">
//           {notification}
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Link, Navigate, Outlet,useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceSharpIcon from '@mui/icons-material/AccountBalanceSharp'
import AssignmentIcon from '@mui/icons-material/Assignment';


import DashboardIcon from '@mui/icons-material/Dashboard';

import AdjustIcon from '@mui/icons-material/Adjust';
import { Stack, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import Logo from "../assets/logo.png";

export default function DefaultLayout() {
  const { user, token, notification, setUser, setToken } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = () => {
    navigate('profile')
  };

  const handleLogout = () => {
    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      })
      .catch((error) => {
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
            <Stack direction="row" alignItems='center'>
                <DashboardIcon style={{marginRight:5}} />
                    Dashboard
            </Stack>
        </Link>




        <Link to="/users">
            <Stack direction="row" alignItems='center'>
                <AccountBoxIcon style={{marginRight:5}} />
                    Users
            </Stack>
        </Link>




        <Link to="/demande">
          <Stack direction="row" alignItems='center'>
                <AdjustIcon style={{ marginRight: 5 }} />
                    Demandes de Congés
          </Stack>
        </Link>




        <Link to="/conge">
            <Stack direction="row" alignItems='center'>
                <AccountBalanceSharpIcon style={{marginRight:5}} />
                    Types de congés
            </Stack>
        </Link>




        <Link to="/contrat">
            <Stack direction="row" alignItems='center'>
                <AssignmentIcon style={{marginRight:5}} />
                    Types de contrats
            </Stack>
        </Link>



        
        <Link to="/demande_user">
            <Stack direction="row" alignItems='center'>
                <AdjustIcon style={{marginRight:5}} />
                    Demande Congé
            </Stack>
        </Link>



</aside>

<div className="content">
        <header>

          <div>

            <Stack direction="row" alignItems="center">
              <img src={Logo} width="70" alt="logo" style={{ marginRight: 5 }} /> &nbsp;
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
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
}