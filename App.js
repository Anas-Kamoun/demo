// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });






// import { NavigationContainer } from '@react-navigation/native';
// import React from 'react';
// import { View } from 'react-native';
// import MyComponent from './MyComponent';
// import DefaultLayout from './DefaultLayout';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <View>
//         <DefaultLayout />
//         {/* <MyComponent /> */}
//       </View>
//     </NavigationContainer>
//   );
// };

// export default App;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



import DefaultLayout from "./DefaultLayout";
import GuestLayout from "./GuestLayout";
import Login from "./Login";

import Users from "./users";
import Signup from "./SIgnup";
import Contrat from "./Contrat";
// import UserForm from "./UserForm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="DefaultLayout" component={DefaultLayout} options={{ headerShown: false }} />
         <Stack.Screen name="GuestLayout" component={GuestLayout} options={{ headerShown: false }} /> */}
        {/* <Signup/> */}
        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Contrat" component={Contrat} />


        {/* <Stack.Screen name="UserForm" component={UserForm} /> */}


        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
