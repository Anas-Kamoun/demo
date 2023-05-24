import React from "react";
import { HStack, Text } from "native-base";
import {  Image, TouchableOpacity } from "react-native";
import { useStateContext } from "../ContextProvider";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Header = () => {
  const { user,setToken,setUser } = useStateContext();
  const navigation = useNavigation()
  const URL = 'https://f4e6-197-11-155-66.ngrok-free.app/api'
    const logoutHandler = async () => {
        await AsyncStorage.removeItem('ACCESS_TOKEN')
        await AsyncStorage.removeItem('user')
          setUser({});
          setToken(null);
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
    
    }

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      style={{ height: 70 }}
      bg="gray.100"
      px="3"
    >
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 50, height: 50 }}
      />
      <HStack alignItems="center">
        <FontAwesome name="user-circle-o" size={30} color="#666666" />
        <Text fontSize="md" color="indigo.800" ml="2">
          {user.name}
        </Text>
        <TouchableOpacity
        onPress={logoutHandler}
          style={{
          
            marginLeft: 3,
            paddingHorizontal: 3,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
};

export default Header;
