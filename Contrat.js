import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axiosClient from "./axios";
import { useStateContext } from "./ContextProvider";

export default function Contrat() {
  const [contrats, setContrats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setNotification } = useStateContext();

  useEffect(() => {
    getContrats();
  }, []);

  const onDelete = (contrat) => {
    if (!window.confirm("Are you sure you want to delete this Contrat?")) {
      return;
    }
    axiosClient
      .delete(`contrats/${contrat.id}`)
      .then(() => {
        setNotification("Contrat was deleted successfully");
        getContrats();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getContrats = () => {
    setLoading(true);
    axiosClient
      .get("/contrats")
      .then(({ data }) => {
        setLoading(false);
        setContrats(data.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Types des contrats</Text>
        {user.role === "super_admin" && (
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Add New</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.card}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>ID</Text>
          <Text style={styles.tableHeaderCell}>Name</Text>
          <Text style={styles.tableHeaderCell}>Solde</Text>
          <Text style={styles.tableHeaderCell}>Autorisation</Text>
          <Text style={styles.tableHeaderCell}>Create Date</Text>
          <Text style={styles.tableHeaderCell}>Actions</Text>
        </View>
        {loading ? (
          <View style={styles.tableBody}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={styles.tableBody}>
            {contrats.map((contrat) => (
              <View style={styles.tableRow} key={contrat.id}>
                <Text style={styles.tableCell}>{contrat.id}</Text>
                <Text style={styles.tableCell}>{contrat.name}</Text>
                <Text style={styles.tableCell}>{contrat.soldec}</Text>
                <Text style={styles.tableCell}>{contrat.autorisation}</Text>
                <Text style={styles.tableCell}>{contrat.created_at}</Text>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.buttonLabel}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(contrat)}
                  >
                    <Text style={styles.buttonLabel}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  addButtonLabel: {
    color: "white",
    fontSize: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  tableBody: {},
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 10,
    paddingBottom: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    marginBottom: 5,
  },
  actionsContainer: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  buttonLabel: {
    color: "white",
    fontSize: 14,
  },
});
