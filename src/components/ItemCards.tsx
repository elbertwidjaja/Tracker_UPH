import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Modal } from "react-native";
import useFetch from "../hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { styles } from "./ItemCardsStyles";

type ItemType = {
  item_name: string;
  due_date: string;
  purchase_date: string;
  item_id: number;
  transaction_id: number;
  shopId: number;
  customer_id: number;
  shop_name: string;
};

function ItemCards() {
  const formatDate = (dateString: string): string => {
    return dateString.substring(0, 10);
  };

  const { fetchData } = useFetch();
  const [transactionData, setTransactionData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType>();
  const [deleteResponse, setDeleteResponse] = useState(false);

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
  }, [deleteResponse]);

  const handleInfo = (item: ItemType) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleDelete = async (transactionId: any) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const url = `http://localhost:3000/api/transaction/${transactionId}`;
      const method = "DELETE";
      const headers = { Authorization: `Bearer ${token}` };

      const response = await fetch(url, {
        method,
        headers,
      });
      console.log(response);

      setDeleteResponse(response.ok);

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      Toast.show({
        type: "success",
        text1: "Transaction deleted successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Transaction deleted unsuccessful",
      });
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.item_name}</Text>
          <Text>{`Due Date: ${formatDate(item.due_date)}`}</Text>
          <Text>{`Purchase Date: ${formatDate(item.purchase_date)}`}</Text>
          <Text>{`Item ID: ${item.item_id}`}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={() => handleInfo(item)}
          >
            <Text style={styles.buttonText}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDelete(item.transaction_id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {selectedItem && (
                  <>
                    <Text style={styles.modalText}>Item Informations</Text>
                    <Text>{`Item Name: ${selectedItem.item_name}`}</Text>
                    <Text>
                      {`Due Date: ${formatDate(selectedItem.due_date)}`}
                    </Text>
                    <Text>
                      {`Purchase Date: ${formatDate(
                        selectedItem.purchase_date
                      )}`}
                    </Text>
                    <Text>{`Item ID: ${selectedItem.item_id}`}</Text>
                    <Text>{`Transaction ID: ${selectedItem.transaction_id}`}</Text>
                    <Text>{`Customer ID: ${selectedItem.customer_id}`}</Text>
                    <Text>{`Shop ID: ${selectedItem.shopId}`}</Text>
                    <Text>{`Shop Name: ${selectedItem.shop_name}`}</Text>
                  </>
                )}
                <TouchableOpacity
                  style={[styles.button, styles.deleteButtonModal]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={transactionData}
      renderItem={renderItem}
      contentContainerStyle={styles.flatListContainer}
    />
  );
}

export default ItemCards;
