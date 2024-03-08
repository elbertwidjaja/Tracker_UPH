import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import useFetch from "../hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ItemCards() {
  const formatDate = (dateString: string): string => {
    return dateString.substring(0, 10);
  };

  const { fetchData } = useFetch();
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const getTransactionItems = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const url = "http://localhost:3000/api/transaction/customer";
        const method = "GET";
        const body = "";
        const headers = { Authorization: `Bearer ${token}` };
        const responseData = await fetchData(url, method, body, headers);

        setTransactionData(responseData.transactions);
      } catch (error) {
        console.error(error);
      }
    };
    getTransactionItems();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.item_name}</Text>
      <Text>{`Due Date: ${formatDate(item.due_date)}`}</Text>
      <Text>{`Purchase Date: ${formatDate(item.purchase_date)}`}</Text>
      <Text>{`Item ID: ${item.item_id}`}</Text>
    </View>
  );

  return (
    <FlatList
      data={transactionData}
      renderItem={renderItem}
      contentContainerStyle={styles.flatListContainer}
    />
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 20,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ItemCards;
