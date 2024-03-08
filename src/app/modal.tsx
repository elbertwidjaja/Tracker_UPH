import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function ModalScreen() {
  const { fetchData } = useFetch();

  const [shopData, setShopData] = useState<
    { shop_name: string; shop_id: number }[]
  >([]);

  const [items, setItems] = useState<
    { item_id: string; item_name: string; shop_id: number }[]
  >([]);

  const [itemName, setItemName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedShopId, setSelectedShopId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const getShopsName = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const url1 = "http://localhost:3000/api/shops";
        const url2 = "http://localhost:3000/api/items";
        const method = "GET";
        const body = "";

        const responseShops = await fetchData(url1, method, body);
        const responseItems = await fetchData(url2, method, body);

        setItems(responseItems.items);

        const shopData = responseShops.map(
          (shop: { shop_name: string; shop_id: number }) => ({
            shop_name: shop.shop_name,
            shop_id: shop.shop_id,
          })
        );
        setShopData(shopData);
      } catch (error) {
        console.error(error);
      }
    };
    getShopsName();
  }, []);

  console.log(shopData, "shops");
  console.log(items, "items");
  console.log(typeof selectedShopId);

  const handleSubmit = () => {};

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
      {/* <Text style={styles.label}>Shop Name</Text>
      <Picker
        selectedValue={selectedShopId}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue, itemIndex) => setSelectedShopId(itemValue)}
      >
        <Picker.Item label="Select Shop here" value={0} key={-1} />
        {shopData.map((shop, index) => (
          <Picker.Item
            label={shop.shop_name}
            value={shop.shop_id}
            key={index}
          />
        ))}
      </Picker> */}

      <Text style={styles.label}>Items Name</Text>
      <Picker
        selectedValue={selectedShopId}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue, itemIndex) => setSelectedShopId(itemValue)}
      >
        <Picker.Item label="Select Item here" />
        {items
          .filter(
            (item: { shop_id: number | undefined }) =>
              item.shop_id === selectedShopId
          )
          .map((item: { item_name: string | undefined }) => {
            return (
              <Picker.Item label={item.item_name} value={item.item_name} />
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
