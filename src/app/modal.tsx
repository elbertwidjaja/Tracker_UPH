import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useFetch from "../hooks/useFetch";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function ModalScreen() {
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
        const url1 = "http://localhost:3000/api/shops";
        const url2 = "http://localhost:3000/api/items";
        const method = "GET";
        const body = "";

        const responseShops = await fetchData(url1, method, body);
        const responseItems = await fetchData(url2, method, body);

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

  const handleSubmit = () => {
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

        const url = "http://localhost:3000/api/transaction";
        const method = "POST";
        const body = {
          shopId: selectedShopId,
          itemId: itemId,
          itemName: selectedItemName,
          purchaseDate: "10-12-21",
          dueDate: "10-12-24",
          shopName: shopName,
        };
        const headers = { Authorization: `Bearer ${token}` };

        const data = await fetchData(url, method, body, headers);
        console.log(data);
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

      <TextInput
        style={styles.input}
        placeholder="Purchase Date"
        value={purchaseDate}
        onChangeText={(text) => setPurchaseDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date"
        value={dueDate}
        onChangeText={(text) => setDueDate(text)}
      />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  picker: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  pickerItem: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
