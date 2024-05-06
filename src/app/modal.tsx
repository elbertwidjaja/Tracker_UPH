import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useFetch from "../hooks/useFetch";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import PickDate from "../components/PickDate";
import * as Notifications from "expo-notifications";
import { styles } from "./modalStyle";
import { BASE_URL } from "@/env";
import { useTransactionData } from "@/src/context/transactionData";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function ModalScreen() {
  const { transactionData, setTransactionData } = useTransactionData();

  const { fetchData } = useFetch();
  const navigation = useNavigation();

  const [shopData, setShopData] = useState<
    { shop_name: string; shop_id: number }[]
  >([]);

  const [items, setItems] = useState<
    { item_id: string; item_name: string; shop_id: number }[]
  >([]);

  const [purchaseDate, setPurchaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedShopId, setSelectedShopId] = useState<number>(0);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  useEffect(() => {
    const getShopsName = async () => {
      try {
        const url1 = `${BASE_URL}shops`;
        const url2 = `${BASE_URL}items`;
        const method = "GET";
        const body = "";
        const headers = {
          "ngrok-skip-browser-warning": "true",
        };

        const responseShops = await fetchData(url1, method, body, headers);
        const responseItems = await fetchData(url2, method, body, headers);

        const shopData = responseShops.map(
          (shop: { shop_name: string; shop_id: number }) => ({
            shop_name: shop.shop_name,
            shop_id: shop.shop_id,
          })
        );

        setShopData(shopData);
        setItems(responseItems.items);
      } catch (error) {
        console.error(error);
      }
    };

    getShopsName();
  }, []);

  const handleSubmit = async () => {
    const findShopNameById = (id: number) => {
      const shop = shopData.find((shop) => shop.shop_id === id);
      return shop ? shop.shop_name : "";
    };

    const findItemIdByName = (name: string) => {
      const item = items.find((item) => item.item_name === name);
      return item ? item.item_id : "";
    };

    const itemId = findItemIdByName(selectedItemName);
    const shopName = findShopNameById(selectedShopId);

    const addTransaction = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const url = `${BASE_URL}transaction`;
        const method = "POST";
        const body = {
          shopId: selectedShopId,
          itemId: itemId,
          itemName: selectedItemName,
          purchaseDate: purchaseDate,
          dueDate: dueDate,
          shopName: shopName,
        };
        const headers = { Authorization: `Bearer ${token}` };

        console.log(purchaseDate, "pruchase datea modal ");
        console.log(dueDate, "duedate modal ");

        const data = await fetchData(url, method, body, headers);
        setTransactionData(data);

        const { status } = await Notifications.getPermissionsAsync();

        if (status !== "granted") {
          alert("Permission to send notifications was denied");
          return;
        }

        Notifications.scheduleNotificationAsync({
          content: {
            title: "There is an item that almost due!",
            body: "Please check you items right now!",
          },
          trigger: null,
        });

        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    };

    addTransaction();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Item</Text>

      <Text style={styles.label}>Purchase Date</Text>
      <PickDate onDateChange={(date: string) => setPurchaseDate(date)} />

      <Text style={styles.label}>Due Date</Text>
      <PickDate onDateChange={(date: string) => setDueDate(date)} />

      <Text style={styles.label}>Shop Name</Text>

      <Picker
        selectedValue={selectedShopId}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue) => {
          setSelectedShopId(Number(itemValue));
        }}
      >
        <Picker.Item label="Select Shop here" value={0} key={-1} />
        {shopData.map((shop, index) => (
          <Picker.Item
            label={shop.shop_name}
            value={shop.shop_id}
            key={index}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Items Name</Text>
      <Picker
        selectedValue={selectedItemName}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue) => {
          setSelectedItemName(itemValue);
        }}
      >
        <Picker.Item label="Select Item here" />
        {items
          .filter(
            (item: { shop_id: number }) => item.shop_id === selectedShopId
          )
          .map((item: { item_name: string }, index: number) => {
            return (
              <Picker.Item
                label={item.item_name}
                value={item.item_name}
                key={index}
              />
            );
          })}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
