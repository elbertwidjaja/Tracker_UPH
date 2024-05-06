import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import useFetch from "../hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PickDate from "@/src/components/PickDate";
import { BASE_URL } from "@/env";

type ItemType = {
  id: number;
  item_id: string;
  item_name: string;
};

const FormItem = () => {
  const { fetchData } = useFetch();

  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [items, setItems] = useState<ItemType[]>([]);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const getAdminShopsDatas = async () => {
    const token = await AsyncStorage.getItem("token");

    const url = `${BASE_URL}admin/items`;
    const method = "GET";
    const body = "";
    const headers = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    };

    const itemsData = await fetchData(url, method, body, headers);
    setItems(itemsData);
  };

  const insertAdminTransaction = async () => {
    const token = await AsyncStorage.getItem("token");

    const url = `${BASE_URL}admin/transactions`;
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

  const handlePurchaseDateChange = (date: React.SetStateAction<string>) => {
    setPurchaseDate(date);
  };

  const handleDueDateChange = (date: React.SetStateAction<string>) => {
    setDueDate(date);
  };

  return (
    <View>
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
      <PickDate onDateChange={handlePurchaseDateChange} />

      <Text style={styles.label}>Due Date:</Text>
      <PickDate onDateChange={handleDueDateChange} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  button: {
    marginTop: 25,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default FormItem;
