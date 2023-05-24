// import React, { useEffect, useState } from "react";
// import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
// import axiosClient from "./axios";
// import { useStateContext } from "./ContextProvider";
// import { Link } from 'react-router-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { user, setNotification } = useStateContext();

//   useEffect(() => {
//     getUsers();
//   }, []);

//   const onDelete = (u) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) {
//       return;
//     }
//     axiosClient
//       .delete(`users/${u.id}`)
//       .then(() => {
//         setNotification("User was deleted successfully");
//         getUsers();
//       });
//   };

//   const getUsers = () => {
//     setLoading(true);
//     axiosClient
//       .get("/users")
//       .then(({ data }) => {
//         setLoading(false);
//         setUsers(data.data);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };

//   const renderUserItem = ({ item }) => (
//     <View>
//       <Text>ID: {item.id}</Text>
//       <Text>Name: {item.name}</Text>
//       <Text>Email: {item.email}</Text>
//       <Text>Create Date: {item.created_at}</Text>
//       <View style={{ flexDirection: "row" }}>
//         <TouchableOpacity
//           onPress={() => {
//             // Navigation logic for Edit screen
//           }}
//           style={{ marginRight: 10 }}
//         >
//           <Text>Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => onDelete(item)}>
//           <Text>Delete</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View>
//       <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//         <Text>Users</Text>
//         {users.role == 'super_admin' && (
//           <Link to="/users/new" style={styles.addButton}>
//             <Text style={styles.addButtonText}>Add New</Text>
//           </Link>
//         )}
//       </View>
//       <View>
//         <FlatList
//           data={users}
//           renderItem={renderUserItem}
//           keyExtractor={(item) => item.id.toString()}
//           ListEmptyComponent={<Text>Loading...</Text>}
//         />
//       </View>
//     </View>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
// import axiosClient from "./axios";
// import { useStateContext } from "./ContextProvider";
// import { Link } from 'react-router-native';

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { user, setNotification } = useStateContext();

//   useEffect(() => {
//     getUsers();
//   }, []);

//   const onDelete = (u) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) {
//       return;
//     }
//     axiosClient
//       .delete(`users/${u.id}`)
//       .then(() => {
//         setNotification("User was deleted successfully");
//         getUsers();
//       });
//   };

//   const getUsers = () => {
//     setLoading(true);
//     axiosClient
//       .get("/users")
//       .then(({ data }) => {
//         setLoading(false);
//         setUsers(data.data);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };

//   const renderUserItem = ({ item }) => (
//     <View style={styles.userItemContainer}>
//       <Text style={styles.userInfo}>ID: {item.id}</Text>
//       <Text style={styles.userInfo}>Name: {item.name}</Text>
//       <Text style={styles.userInfo}>Email: {item.email}</Text>
//       <Text style={styles.userInfo}>Create Date: {item.created_at}</Text>
//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity
//           onPress={() => {
//             // Navigation logic for Edit screen
//           }}
//           style={styles.editButton}
//         >
//           <Text style={styles.buttonText}>Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteButton}>
//           <Text style={styles.buttonText}>Delete</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Users</Text>
//         {users.role === 'super_admin' && (
//           <Link to="/users/new" style={styles.addButton}>
//             <Text style={styles.addButtonText}>Add New</Text>
//           </Link>
//         )}
//       </View>
//       <View style={styles.userList}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#000000" />
//         ) : (
//           <FlatList
//             data={users}
//             renderItem={renderUserItem}
//             keyExtractor={(item) => item.id.toString()}
//             ListEmptyComponent={<Text>No users found.</Text>}
//           />
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   addButton: {
//     padding: 8,
//     backgroundColor: "blue",
//     borderRadius: 4,
//   },
//   addButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   userList: {
//     flex: 1,
//   },
//   userItemContainer: {
//     borderWidth: 1,
//     borderColor: "#CCCCCC",
//     borderRadius: 4,
//     padding: 16,
//     marginBottom: 8,
//   },
//   userInfo: {
//     marginBottom: 8,
//   },
//   buttonsContainer: {
//     flexDirection: "row",
//   },
//   editButton: {
//     marginRight: 10,
//     padding: 8,
//     backgroundColor: "green",
//     borderRadius: 4,
//   },
//   deleteButton: {
//     padding: 8,
//     backgroundColor: "red",
//     borderRadius: 4,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });


// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
// import axiosClient from "./axios";
// import { useStateContext } from "./ContextProvider";
// import { Link } from 'react-router-native';

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { user, setNotification } = useStateContext();

//   useEffect(() => {
//     getUsers();
//   }, []);

//   const onDelete = (u) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) {
//       return;
//     }
//     axiosClient
//       .delete(`users/${u.id}`)
//       .then(() => {
//         setNotification("User was deleted successfully");
//         getUsers();
//       });
//   };

//   const getUsers = () => {
//     setLoading(true);
//     axiosClient
//       .get("/users")
//       .then(({ data }) => {
//         setLoading(false);
//         setUsers(data.data);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };

//   const renderUserItem = ({ item }) => (
//     <View style={styles.userItemContainer}>
//       <Text style={styles.userInfo}>ID: {item.id}</Text>
//       <Text style={styles.userInfo}>Name: {item.name}</Text>
//       <Text style={styles.userInfo}>Email: {item.email}</Text>
//       <Text style={styles.userInfo}>Create Date: {item.created_at}</Text>
//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity
//           onPress={() => {
//             // Navigation logic for Edit screen
//           }}
//           style={styles.editButton}
//         >
//           <Text style={styles.buttonText}>Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteButton}>
//           <Text style={styles.buttonText}>Delete</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Users</Text>
//         {users.role === 'super_admin' && (
//           <Link to="/users/new" style={styles.addButton}>
//             <Text style={styles.addButtonText}>Add New</Text>
//           </Link>
//         )}
//       </View>
//       <View style={styles.userList}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#000000" />
//         ) : (
//           <FlatList
//             data={users}
//             renderItem={renderUserItem}
//             keyExtractor={(item) => item.id.toString()}
//             ListEmptyComponent={<Text>No users found.</Text>}
//           />
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = {
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   addButton: {
//     padding: 8,
//     backgroundColor: "blue",
//     borderRadius: 4,
//   },
//   addButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   userList: {
//     flex: 1,
//   },
//   userItemContainer: {
//     borderWidth: 1,
//     borderColor: "#CCCCCC",
//     borderRadius: 4,
//     padding: 16,
//     marginBottom: 16,
//   },
//   userInfo: {
//     marginBottom: 8,
//   },
//   buttonsContainer: {
//     flexDirection: "row",
//   },
//   editButton: {
//     marginRight: 10,
//     padding: 8,
//     backgroundColor: "green",
//     borderRadius: 4,
//   },
//   deleteButton: {
//     padding: 8,
//     backgroundColor: "red",
//     borderRadius: 4,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// };



import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axiosClient from "../axios";
import { useStateContext } from "../ContextProvider";
import { Link } from 'react-router-native';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setNotification } = useStateContext();

  useEffect(() => {
    getUsers();
  }, []);

  const onDelete = (u) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient
      .delete(`users/${u.id}`)
      .then(() => {
        setNotification("User was deleted successfully");
        getUsers();
      });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItemContainer}>
      <Text style={styles.userInfo}>ID: {item.id}</Text>
      <Text style={styles.userInfo}>Name: {item.name}</Text>
      <Text style={styles.userInfo}>Email: {item.email}</Text>
      <Text style={styles.userInfo}>Create Date: {item.created_at}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            // Navigation logic for Edit screen
          }}
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
        {users.role === 'super_admin' && (
          <Link to="/users/new" style={styles.addButton}>
            <Text style={styles.addButtonText}>Add New</Text>
          </Link>
        )}
      </View>
      <View style={styles.userList}>
        {loading ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : (
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text style={styles.emptyText}>No users found.</Text>}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    padding: 8,
    backgroundColor: "blue",
    borderRadius: 4,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  userList: {
    flex: 1,
  },
  userItemContainer: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  userInfo: {
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    padding: 8,
    backgroundColor: "green",
    borderRadius: 4,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "red",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 16,
  },
});
