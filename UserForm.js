// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axiosClient from './axios';
// import { useStateContext } from './ContextProvider';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { MenuItem, Select ,DropDown} from 'react-native-material-dropdown';

// export default function UserForm() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { id } = route.params;
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState(null);
//   const { user, setNotification } = useStateContext();
//   const [userValue, setUserValue] = useState({
//     id: '',
//     name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//     role: '',
//     poste_id: '',
//     contrat_id: '',
//   });

//   const [ContratValue, setContratValue] = useState('');
//   const [Contrats, setContrats] = useState([]);
//   const currentContrat = Contrats.find((el) => el.id === userValue.contrat_id) || {
//     name: '',
//     id: '',
//   };

//   const [PosteValue, setPosteValue] = useState('');
//   const [Poste, setPostes] = useState([]);
//   const currentPoste = Poste.find((el) => el.id === userValue.poste_id) || {
//     name: '',
//     id: '',
//   };

//   useEffect(() => {
//     setLoading(true);
//     if (user.role === 'user') {
//       navigation.navigate('Dashboard');
//     } else {
//       if (id) {
//         axiosClient
//           .get(`/users/${id}`)
//           .then(({ data }) => {
//             setLoading(false);
//             setUserValue(data.data);
//           })
//           .catch(() => {
//             setLoading(false);
//           });
//       } else {
//         setLoading(false);
//       }
//     }
//     axiosClient
//       .get('/contrats')
//       .then(({ data }) => {
//         setLoading(false);
//         setContrats(data.data);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//     axiosClient
//       .get('/postes')
//       .then(({ data }) => {
//         setLoading(false);
//         setPostes(data.data);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, [id, user]);

//   const onSubmit = () => {
//     if (userValue.id) {
//       axiosClient
//         .put(`/users/${userValue.id}`, userValue)
//         .then(() => {
//           setNotification('User was updated successfully');
//           navigation.navigate('Users');
//         })
//         .catch((err) => {
//           const response = err.response;
//           if (response && response.status === 422) {
//             setErrors(response.data.errors);
//             console.log(response.data.errors);
//           }
//         });
//     } else {
//       axiosClient
//         .post('/users/', userValue)
//         .then(() => {
//           setNotification('User was created successfully');
//           navigation.navigate('Users');
//         })
//         .catch((err) => {
//           const response = err.response;
//           if (response && response.status === 422) {
//             setErrors(response.data.errors);
//             console.log(response.data.errors);
//           }
//         });
//     }
//   };

//   return (
//     <View>
//       {userValue.id && <Text>Update User : {userValue.name}</Text>}
//       {!userValue.id && <Text>New User</Text>}
//       <View style={styles.card}>
//         {loading && <Text>Loading...</Text>}
//         {errors && (
//           <View style={styles.alert}>
//             {Object.keys(errors).map((key) => (
//               <Text key={key}>{errors[key][0]}</Text>
//             ))}
//           </View>
//         )}
//         {!loading && (
//           <KeyboardAwareScrollView>
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) => setUserValue({ ...userValue, name: text })}
//               value={userValue.name}
//               placeholder="Name"
//             />
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) => setUserValue({ ...userValue, email: text })}
//               value={userValue.email}
//               placeholder="Email"
//             />
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) => setUserValue({ ...userValue, password: text })}
//               placeholder="Password"
//             />
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) =>
//                 setUserValue({ ...userValue, password_confirmation: text })
//               }
//               placeholder="Password Confirmation"
//             />
//             <View>
//               <Select
//                 style={styles.input}
//                 label="Role"
//                 value={userValue.role}
//                 onValueChange={(value) => setUserValue({ ...userValue, role: value })}
//               >
//                 <MenuItem value="" disabled>
//                   Role ?
//                 </MenuItem>
//                 <MenuItem value={'user'}>Simple User</MenuItem>
//                 <MenuItem value={'admin'}>Admin</MenuItem>
//                 <MenuItem value={'super_admin'}>Super Admin</MenuItem>
//               </Select>
//               <Select
//                 style={styles.input}
//                 label="Type contrat"
//                 value={currentContrat.id}
//                 onValueChange={(value) =>
//                   setUserValue({ ...userValue, contrat_id: value }, setContratValue(value))
//                 }
//               >
//                 <MenuItem value="" disabled>
//                   Type contrat ?
//                 </MenuItem>
//                 {Contrats.map((c) => {
//                   return (
//                     <MenuItem value={c.id} key={c.id}>
//                       {c.name}
//                     </MenuItem>
//                   );
//                 })}
//               </Select>
//               <Select
//                 style={styles.input}
//                 label="Type Postes"
//                 value={currentPoste.id}
//                 onValueChange={(value) =>
//                   setUserValue({ ...userValue, poste_id: value }, setPosteValue(value))
//                 }
//               >
//                 <MenuItem value="" disabled>
//                   Type Postes ?
//                 </MenuItem>
//                 {Poste.map((c) => {
//                   return (
//                     <MenuItem value={c.id} key={c.id}>
//                       {c.name}
//                     </MenuItem>
//                   );
//                 })}
//               </Select>
//             </View>
//             <Button onPress={onSubmit} title="Save" />
//           </KeyboardAwareScrollView>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     marginTop: 10,
//     marginBottom: 10,
//     marginLeft: 30,
//     marginRight: 30,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   input: {
//     height: 48,
//     width: '100%',
//     borderRadius: 5,
//     overflow: 'hidden',
//     backgroundColor: 'white',
//     marginTop: 10,
//     marginBottom: 10,
//     paddingLeft: 16,
//   },
//   alert: {
//     backgroundColor: 'red',
//     color: 'white',
//     padding: 10,
//     marginBottom: 10,
//   },
// });
