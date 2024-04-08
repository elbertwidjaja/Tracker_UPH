import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Modal } from "react-native";
import useFetch from "../hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@/env";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./ItemCardsStyles";
import { Image } from "react-native";
import { useTransactionData } from "@/src/context/transactionData";

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

type ItemData = {
  item_id: number;
  item_name: string;
  imageUrl: string;
}[];

function ItemCards() {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  };

  const { fetchData } = useFetch();
  const { transactionData, setTransactionData } = useTransactionData();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [itemData, setItemData] = useState<ItemData>([]);
  const [selectedImgUrl, setSelectedImgUrl] = useState<string | undefined>("");

  const getTransactionItems = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const url = `${BASE_URL}transaction/customer`;
      const method = "GET";
      const body = "";
      const headers = { Authorization: `Bearer ${token}` };
      const responseData = await fetchData(url, method, body, headers);

      setTransactionData(responseData.transactions);
    } catch (error) {
      console.error(error);
    }
  };

  const getItemsInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("items");

      const url = `${BASE_URL}/items`;
      const method = "GET";
      const body = "";
      const headers = { Authorization: `Bearer ${token}` };
      const responseItemInfoData = await fetchData(url, method, body, headers);

      setItemData(responseItemInfoData.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItemsInfo();
  }, []);

  const handleInfo = (item: ItemType) => {
    setSelectedItem(item);

    const test = itemData.find((items) => items.item_id === item.item_id);

    setSelectedImgUrl(test?.imageUrl);

    setModalVisible(true);
  };

  const handleDelete = async (transactionId: any) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const url = `${BASE_URL}transaction/${transactionId}`;
      const method = "DELETE";
      const headers = { Authorization: `Bearer ${token}` };

      const response = await fetch(url, {
        method,
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      setTransactionData(
        transactionData.filter((item) => item.transaction_id !== transactionId)
      );

      Toast.show({
        type: "success",
        text1: "Transaction deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Toast.show({
        type: "error",
        text1: "Transaction deletion failed. Please try again.",
      });
    }
  };

  return (
    <>
      <FlatList
        data={transactionData}
        renderItem={({ item }) => (
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
                <AntDesign name="folderopen" size={12} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.transaction_id)}
              >
                <AntDesign name="delete" size={12} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.transaction_id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedItem && (
              <>
                <Image
                  source={{
                    uri: selectedImgUrl,
                  }}
                  style={{ width: 200, height: 200, marginBottom: 30 }}
                />
                <Text style={styles.modalText}>Item Informations</Text>
                <Text>{`Item Name: ${selectedItem.item_name}`}</Text>
                <Text>{`Due Date: ${formatDate(selectedItem.due_date)}`}</Text>
                <Text>{`Purchase Date: ${formatDate(
                  selectedItem.purchase_date
                )}`}</Text>
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
    </>
  );
}

export default ItemCards;
