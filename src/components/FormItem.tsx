import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useFetch from "../hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ItemType = {
  id: number;
  item_id: string;
  item_name: string;
};

const FormItem = () => {
  const { fetchData } = useFetch();

  const [dueDate, setDueDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [items, setItems] = useState<ItemType[]>([]);

  const getAdminShopsDatas = async () => {
    const token = await AsyncStorage.getItem("token");

    const url = "http://localhost:3000/api/admin/items";
    const method = "GET";
    const body = "";
    const headers = { Authorization: `Bearer ${token}` };

    const itemsData = await fetchData(url, method, body, headers);
    console.log(itemsData, "data");
    setItems(itemsData);
  };

  const insertAdminTransaction = async () => {
    const token = await AsyncStorage.getItem("token");

    const url = "http://localhost:3000/api/admin/transactions";
    const method = "POST";
    const body = {
      customerId: 2,
      itemId: selectedItemId,
      itemName: selectedItem,
      purchaseDate: purchaseDate,
      dueDate: dueDate,
    };
    const headers = { Authorization: `Bearer ${token}` };

    await fetchData(url, method, body, headers);
  };

  useEffect(() => {
    getAdminShopsDatas();
  }, []);

  const handleSubmit = () => {
    insertAdminTransaction();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Admin Add Item</Text>

      <Text style={styles.label}>Item:</Text>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedItem(itemValue);
          setSelectedItemId(items[itemIndex].item_id);
        }}
        style={styles.picker}
      >
        {items.map((item) => (
          <Picker.Item
            key={item.id}
            label={item.item_name}
            value={item.item_name}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Customer ID:</Text>
      <TextInput
        style={styles.input}
        value={customerID}
        onChangeText={setCustomerID}
        placeholder="Enter customer ID"
      />

      <Text style={styles.label}>Purchase Date:</Text>
      <TextInput
        style={styles.input}
        value={purchaseDate}
        onChangeText={setPurchaseDate}
        placeholder="Enter purchase date"
      />

      <Text style={styles.label}>Due Date:</Text>
      <TextInput
        style={styles.input}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="Enter due date"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default FormItem;
