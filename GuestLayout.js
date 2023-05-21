import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "./ContextProvider";

export default function GuestLayout() {
  const navigation = useNavigation();
  const { token } = useStateContext();

  React.useEffect(() => {
    if (token) {
      navigation.navigate("DefaultLayout");
    }
  }, [token, navigation]);

  if (token) {
    return null;
  }

  return <View>{/* Votre contenu ici */}</View>;
}
