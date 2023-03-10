// import React, { useState } from "react";
// import {Avatar,Button,Card, CardContent, CardHeader, FormControl, FormGroup,FormLabel,Grid,TextField,Typography,} from "@mui/material";

// const ProfilePage = () => {
//   const [user, setUser] = useState({
//     name: "mehdy zaghmi",
//     email: "mehdizaghm@user.com",
//     address: "radés",
//   });
//   const [newAddress, setNewAddress] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");

//   const handleAddressChange = (event) => {
//     setNewAddress(event.target.value);
//   };

//   const handleCurrentPasswordChange = (event) => {
//     setCurrentPassword(event.target.value);
//   };

//   const handleNewPasswordChange = (event) => {
//     setNewPassword(event.target.value);
//   };

//   const handleConfirmNewPasswordChange = (event) => {
//     setConfirmNewPassword(event.target.value);
//   };

//   const handleSaveChanges = () => {
//     // Call backend API to save changes to user's address and password
//     // ...
//     // Update user state with new information
//     setUser((prevState) => ({
//       ...prevState,
//       address: newAddress,
//     }));
//     setNewAddress("");
//     setCurrentPassword("");
//     setNewPassword("");
//     setConfirmNewPassword("");
//   };

//   return (
//     <div>
//       <Card sx={{ maxWidth: 600, margin: "auto", marginTop: 32 }}>
//         <CardHeader
//           avatar={<Avatar src="/broken-image.jpg" />}
//           title={user.name}
//           subheader={user.email}
//         />
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="h5" gutterBottom>
//                 Change Profile Picture
//               </Typography>
//               <input
//                 accept="image/*"
//                 id="profile-picture-input"
//                 multiple
//                 type="file"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="h5" gutterBottom>
//                 Change Address
//               </Typography>
//               <FormControl fullWidth>
//                 <FormLabel>Current Address</FormLabel>
//                 <Typography>{user.address}</Typography>
//                 <TextField
//                   id="new-address"
//                   label="New Address"
//                   value={newAddress}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="h5" gutterBottom>
//                 Change Password
//               </Typography>
//               <FormGroup>
//                 <FormControl>
//                   <TextField
//                     id="current-password"
//                     label="Current Password"
//                     type="password"
//                     value={currentPassword}
//                     onChange={handleCurrentPasswordChange}
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <TextField
//                     id="new-password"
//                     label="New Password"
//                     type="password"
//                     value={newPassword}
//                     onChange={handleNewPasswordChange}
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <TextField
//                     id="confirm-new-password"
//                     label="Confirm New Password"
//                     type="password"
//                     value={confirmNewPassword}
//                     onChange={handleConfirmNewPasswordChange}
//                   />
               
//                </FormControl>
//               </FormGroup>
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={handleSaveChanges}
//         >
//           Save Changes
//         </Button>
//       </Card>
//     </div>
//   );
// };
// export default ProfilePage;


























// import React, { useState, useEffect } from 'react';

// function ProfilePage(props) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // fetch user data from API or database
//     const fetchUser = async () => {
//       const response = await fetch(`/api/users/${props.userId}`);
//       const data = await response.json();
//       setUser(data);
//     };
//     fetchUser();
//   }, [props.userId]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{user.name}</h1>
//       <p>Email: {user.email}</p>
//       <p>Department: {user.department}</p>
//       <p>Job Title: {user.jobTitle}</p>
//     </div>
//   );
// }

// export default ProfilePage;





























// import React, { useState, useEffect } from 'react';

// function ProfilePage(props) {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     // fetch user data from API
//     const fetchUser = async () => {
//       const response = await fetch(`/api/users/${props.userId}`);
//       const data = await response.json();
//       setUser(data);
//     };
//     fetchUser();
//   }, [props.userId]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleFileChange = (event) => {
//     const { name, files } = event.target;
//     setFormData({
//       ...formData,
//       [name]: files[0]
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = new FormData();
//     form.append('name', formData.name || user.name);
//     form.append('email', formData.email || user.email);
//     form.append('phone_number', formData.phone_number || user.phone_number);
//     if (formData.password) {
//       form.append('password', formData.password);
//     }
//     if (formData.photo) {
//       form.append('photo', formData.photo);
//     }
//     const response = await fetch(`/api/users/${props.userId}`, {
//       method: 'PUT',
//       body: form
//     });
//     const data = await response.json();
//     setUser(data);
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Profile</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" name="name" defaultValue={user.name} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input type="email" name="email" defaultValue={user.email} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label>
//           Phone Number:
//           <input type="tel" name="phone_number" defaultValue={user.phone_number} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" name="password" onChange={handleInputChange} />
//         </label>
//         <br />
//         <label>
//           Photo:
//           <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />
//         </label>
//         <br />
//         <button type="submit">Save Changes</button>
//       </form>
//       <hr />
//       <div>
//         <h2>Current Photo</h2>
//         {user.photo && <img src={`/uploads/${user.photo}`} alt="User's profile" />}
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;



















import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    backgroundColor: red[500],
    position: 'relative',
    overflow: 'hidden',
    '& input': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer',
    },
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const [avatarUrl, setAvatarUrl] = useState('');
  const user = {
    name: 'Zaghmi Mehdi',
    title: 'Software Engineer',
    bio: 'bla bla ',
    email: 'mehdyz@gmail.com',
    phone: '+216 22147589',
    address: 'tunis',
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarUrl(reader.result);
    };
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Avatar className={classes.avatar}>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            <img src={avatarUrl || 'https://via.placeholder.com/300x300'} alt={user.name} />
          </Avatar>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>{user.name}</Typography>
          <Typography variant="h5" gutterBottom>{user.title}</Typography>
          <Typography variant="body1" gutterBottom>{user.bio}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <List>
              <ListItem>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Name" secondary={user.name} />
              </ListItem>
              <ListItem>
              <ListItemIcon><EmailIcon /></ListItemIcon>
                <ListItemText primary="Email" secondary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon><PhoneIcon /></ListItemIcon>
                <ListItemText primary="Phone" secondary={user.phone} />
              </ListItem>
              <ListItem>
                <ListItemIcon><LocationOnIcon /></ListItemIcon>
                <ListItemText primary="Address" secondary={user.address} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;