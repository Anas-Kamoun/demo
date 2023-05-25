import { Platform, StatusBar, StyleSheet } from "react-native";
import React from "react";
import Signup from "./screens/SIgnup";
import Login from "./screens/Login";
import Users from "./screens/Users";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, View } from "native-base";
import { ContextProvider, useStateContext } from "./ContextProvider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Postes from "./screens/Postes";
import Conges from "./screens/Conges";
import Contrats from "./screens/Contrats";
import Header from "./components/Header";
import Demandes from "./screens/Demandes";
import Constants from "expo-constants";
import ContratsForm from "./screens/ContratsForm";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import PostesForm from "./screens/PostesForm";
import UsersForm from "./screens/UsersForm";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { user } = useStateContext();
  return (
    <View flex={1}>
      <Header />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: "#4338ca",
          tabBarInactiveBackgroundColor: "#4f46e5",
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#a1a1aa",
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS == "ios" ? 90 : 50,
            position: "absolute",
            bottom: 0,
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome name="users" size={22} color={color} />
            ),
          }}
          name="Users"
          component={Users}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome5 name="file-invoice" size={22} color={color} />
            ),
          }}
          name="Contrats"
          component={Contrats}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Entypo name="man" size={22} color={color} />
            ),
          }}
          name="Postes"
          component={Postes}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name="alpha-d-circle"
                size={22}
                color={color}
              />
            ),
          }}
          name="Demande"
          component={Demandes}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Entypo name="home" size={22} color={color} />
            ),
          }}
          name="Conges"
          component={Conges}
        />
      </Tab.Navigator>
    </View>
  );
};

const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              marginTop: Platform.OS == "ios" ? Constants.statusBarHeight : 0,
            }}
          >
            <StatusBar />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="TabNavigation" component={TabNavigation} />
              <Stack.Screen name="ContratsForm" component={ContratsForm} />
              <Stack.Screen name="PostesForm" component={PostesForm} />
              <Stack.Screen name="UsersForm" component={UsersForm} />
            </Stack.Navigator>
          </View>
        </NativeBaseProvider>
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
