import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import axiosClient from "../axios";
import { useStateContext } from "../ContextProvider";
import { View, Text } from "native-base";
import { SolidButton } from "../components/Buttons";
import { InputText } from "../components/Inputs";
import Header from "../components/Header";

const ContratForm = ({ navigation, route }) => {
  const contrat = route.params ? route.params : null;

  const id = contrat ? contrat.id : null;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { user, setNotification } = useStateContext();
  const [contratValue, setContrat] = useState({
    id: "",
    name: "",
    soldec: "",
    autorisation: "",
  });

  useEffect(() => {
    setLoading(true);
    // if (user.role !== 'super_admin') {
    //   navigation.navigate("Dashboard");
    // } else {
    if (id) {
      axiosClient
        .get(`/contrats/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setContrat(data.data);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [contrat]);

  const onSubmit = () => {
    if (contratValue.id) {
      axiosClient
        .put(`/contrats/${contratValue.id}`, contratValue)
        .then(() => {
          setNotification("Conge was updated successfully");
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
        .post(`/contrats/`, contratValue)
        .then(() => {
          setNotification("Conge was created successfully");
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
          {contratValue.id && (
            <Text fontSize={24} fontWeight="bold" mb="4" mt="2">
              Modifier Contrat : {contratValue.name}
            </Text>
          )}
          {!contratValue.id && !loading && (
            <Text
              fontSize={24}
              fontWeight="bold"
              mb="4"
              mt="2"
              textAlign="center"
            >
              Nouveau Contrat
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
                setValue={(value) =>
                  setContrat({ ...contratValue, name: value })
                }
                value={contratValue.name}
                placeholder="Nom"
              />
              <InputText
                setValue={(value) =>
                  setContrat({ ...contratValue, soldec: value })
                }
                value={contratValue.soldec.toString()}
                placeholder="Jours par mois"
                keyboardType="numeric"
              />
              <InputText
                setValue={(value) =>
                  setContrat({ ...contratValue, autorisation: value })
                }
                value={contratValue.autorisation}
                placeholder="autorisation/heure"
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

export default ContratForm;
