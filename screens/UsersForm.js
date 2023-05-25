import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import axiosClient from "../axios";
import { View, Text, Icon } from "native-base";
import { SolidButton } from "../components/Buttons";
import { InputText, SelectInput } from "../components/Inputs";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";

const UsersForm = ({ navigation, route }) => {
  const userData = route.params ? route.params : null;

  const id = userData ? userData.id : null;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contrat, setContrat] = useState("");
  const [poste, setPoste] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [postes, setPostes] = useState([]);
  const [contrats, setContrats] = useState([]);
  useEffect(() => {
    setLoading(true);
    // if (user.role !== 'super_admin') {
    //   navigation.navigate("Dashboard");
    // } else {
    if (id) {
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setName(data.data.name);
          setEmail(data.data.email);
          setPhone(data.data.phone);
          setPoste(data.data.poste_id);
          setRole(data.data.role);
          setContrat(data.data.contrat_id);
          axiosClient
            .get("/contrats")
            .then(async ({ data: d }) => {
              let arr = [];
              await d.data.map((el) => {
                arr.push({ value: el.id, label: el.name });
              });
              setContrats(arr);

              axiosClient
                .get("/postes")
                .then(async ({ data: dd }) => {
                  setLoading(false);
                  let arr1 = [];
                  await dd.data.map((el) => {
                    arr1.push({ value: el.id, label: el.name });
                  });

                  setPostes(arr1);
                  console.log("postes", dd.data);
                })
                .catch((errrr) => {
                  setLoading(false);
                  console.log("1", errrr);
                });
            })
            .catch((err) => {
              setLoading(false);
              console.log("2", err);
            });
        })
        .catch((errr) => {
          setLoading(false);
          console.log("3", errr);
        });
    } else {
      axiosClient.get("/contrats").then(async ({ data: d }) => {
        let arr = [];
        await d.data.map((el) => {
          arr.push({ value: el.id, label: el.name });
        });
        setContrats(arr);

        axiosClient
          .get("/postes")
          .then(async ({ data: dd }) => {
            setLoading(false);
            let arr1 = [];
            await dd.data.map((el) => {
              arr1.push({ value: el.id, label: el.name });
            });

            setPostes(arr1);
            console.log("postes", dd.data);
          })
          .catch((errrr) => {
            setLoading(false);
            console.log("1", errrr);
          })
          .catch((err) => {
            setLoading(false);
            console.log("1", err);
          });
      });
    }
  }, [userData]);
  const roles = [
    { label: "Simple user", value: "user" },
    { label: "Super admin", value: "super_admin" },
    { label: "Admin", value: "admin" },
  ];
  const onSubmit = () => {
    setErrors([]);
    if (id) {
      axiosClient
        .put(`/users/${id}`, {
          name,
          email,
          role,
          tel: phone,
          poste_id: Number(poste),
          contrat_id: Number(contrat),
        })
        .then(() => {
          navigation.goBack();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
            console.log(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post(`/users`, {
          name,
          email,
          role,
          password,
          password_confirmation: confirmPassword,
          tel: phone,
          poste_id: Number(poste),
          contrat_id: Number(contrat),
        })
        .then(() => {
          navigation.goBack();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
            console.log(response.data.errors);
          }
        });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Header withBack={true} />
        <View flex={1} px="3">
          {userData && (
            <Text fontSize={24} fontWeight="bold" mb="4" mt="2">
              Modifier Utilisateur : {name}
            </Text>
          )}
          {!userData && !loading && (
            <Text
              fontSize={24}
              fontWeight="bold"
              mb="4"
              mt="2"
              textAlign="center"
            >
              Nouveau Utilisateur
            </Text>
          )}

          {loading && <ActivityIndicator style={styles.loading} />}
          {errors && (
            <View style={styles.alert}>
              {Object.keys(errors).map((key) => (
                <Text key={key} style={styles.error}>
                  {errors[key][0]}
                </Text>
              ))}
            </View>
          )}
          {!loading && (
            <View w="full" flex={1}>
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
              <SelectInput
                options={roles}
                placeholder="Selectionner un rôle"
                value={role}
                setValue={setRole}
              />
              {!userData && (
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
              )}

              {!userData && (
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
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        as={Feather}
                        name="eye-off"
                        size={5}
                        mr={2}
                        color="muted.500"
                      />
                    ) : (
                      <Icon
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        as={Feather}
                        name="eye"
                        size={5}
                        mr={2}
                        color="muted.500"
                      />
                    )
                  }
                />
              )}
              <SelectInput
                options={contrats}
                placeholder="Selectionner un contrat"
                value={contrat}
                setValue={setContrat}
              />
              <SelectInput
                options={postes}
                placeholder="Selectionner un poste"
                value={poste}
                setValue={setPoste}
              />
              <InputText
                value={phone}
                setValue={setPhone}
                placeholder="Phone number"
                InputLeftElement={
                  <Icon
                    as={Feather}
                    name="phone"
                    size={5}
                    ml={2}
                    color="muted.500"
                  />
                }
              />
              <View my="3">
                <SolidButton onPress={onSubmit}>Enregistrer</SolidButton>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "100%",
  },
  loading: {
    marginTop: 16,
  },
  alert: {
    marginTop: 16,
    backgroundColor: "#ffcccc",
    padding: 8,
    borderRadius: 4,
  },
  error: {
    color: "#ff0000",
  },
});

export default UsersForm;
