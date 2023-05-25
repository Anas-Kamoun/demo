import { StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { InputText } from "../components/Inputs";
import { Icon, View, Text } from "native-base";
import Feather from "@expo/vector-icons/Feather";
import { SolidButton } from "../components/Buttons";
import axios from "axios";
import { useStateContext } from "../ContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../axios";

const SIgnup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const { setUser, setToken } = useStateContext();

  const signupHandler = async () => {
    setLoader(true);
    axiosClient
      .post("/signup", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      })
      .then(async (res) => {
        setUser(res.data.user);
        await AsyncStorage.setItem("ACCESS_TOKEN", res.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
        setToken(res.data.token);
        navigation.replace("TabNavigation");
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 22,
            marginVertical: 15,
            textAlign: "center",
          }}
        >
          Sign Up
        </Text>
        <View alignItems="center" px="4">
          <InputText
            value={name}
            setValue={setName}
            placeholder="Name"
            InputLeftElement={
              <Icon
                as={Feather}
                name="user"
                size={5}
                ml={2}
                color="muted.500"
              />
            }
          />
          <InputText
            value={email}
            setValue={setEmail}
            placeholder="Mail address"
            InputLeftElement={
              <Icon
                as={Feather}
                name="mail"
                size={5}
                ml={2}
                color="muted.500"
              />
            }
          />
          <InputText
            value={password}
            setValue={setPassword}
            placeholder="Password"
            secureTextEntry={!showPassword}
            InputLeftElement={
              <Icon
                as={Feather}
                name="lock"
                size={5}
                ml={2}
                color="muted.500"
              />
            }
            InputRightElement={
              showPassword ? (
                <Icon
                  onPress={() => setShowPassword(!showPassword)}
                  as={Feather}
                  name="eye-off"
                  size={5}
                  mr={2}
                  color="muted.500"
                />
              ) : (
                <Icon
                  onPress={() => setShowPassword(!showPassword)}
                  as={Feather}
                  name="eye"
                  size={5}
                  mr={2}
                  color="muted.500"
                />
              )
            }
          />
          <InputText
            value={confirmPassword}
            setValue={setConfirmPassword}
            placeholder="Confirm password"
            secureTextEntry={!showConfirmPassword}
            InputLeftElement={
              <Icon
                as={Feather}
                name="lock"
                size={5}
                ml={2}
                color="muted.500"
              />
            }
            InputRightElement={
              showConfirmPassword ? (
                <Icon
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  as={Feather}
                  name="eye-off"
                  size={5}
                  mr={2}
                  color="muted.500"
                />
              ) : (
                <Icon
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  as={Feather}
                  name="eye"
                  size={5}
                  mr={2}
                  color="muted.500"
                />
              )
            }
          />
          <View mt="3" w="full">
            <SolidButton
              onPress={signupHandler}
              isLoading={loader}
              isLoadingText="Creating user"
            >
              Signup
            </SolidButton>
            <Text textAlign="center" fontSize="md" mt="4">
              Already Registred ?{" "}
              <Text
                onPress={() => navigation.navigate("Login")}
                color="indigo.700"
              >
                Sign in
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SIgnup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    marginTop: -30,
  },
});
