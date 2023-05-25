import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Alert,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import axiosClient from "../axios";
import { useStateContext } from "../ContextProvider";

const Contrats = ({ navigation }) => {
  const [Contrat, setContrats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setNotification } = useStateContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getContrat();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      getContrat();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const onDelete = (u) => {
    Alert.alert(
      "Delete Contrat",
      "Are you sure you want to delete this Contrat?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            axiosClient.delete(`contrats/${u.id}`).then(() => {
              setNotification("Contrat was deleted successfully");
              getContrat();
            });
          },
        },
      ]
    );
  };

  const getContrat = () => {
    if (!refreshing) {
      setLoading(true);
    }
    axiosClient
      .get("/contrats")
      .then(({ data }) => {
        setLoading(false);
        setRefreshing(false);
        setContrats(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const renderContratItem = ({ item }) => (
    <View style={styles.userItemContainer}>
      <Text style={styles.userInfo}>ID: {item.id}</Text>
      <Text style={styles.userInfo}>Name: {item.name}</Text>
      <Text style={styles.userInfo}>Solde: {item.soldec}</Text>
      <Text style={styles.userInfo}>Autorisation: {item.autorisation}</Text>
      <Text style={styles.userInfo}>Create Date: {item.created_at}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            // Navigation logic for Edit screen
            navigation.navigate("ContratsForm", item);
          }}
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Contrats</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ContratsForm");
            }}
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userList}>
          {loading ? (
            <ActivityIndicator size="large" color="#000000" />
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={Contrat}
              renderItem={renderContratItem}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                loading ? null : (
                  <Text style={styles.emptyText}>No Contrats found.</Text>
                )
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Contrats;
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
