import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@/env";

function ValidateCustomer() {
  const [transactionId, setTransactionId] = useState<string>("");
  const [customerData, setCustomerdata] = useState({});

  const getTransactionValidate = async () => {
    if (!transactionId) {
      Toast.show({
        type: "error",
        text1: "The Transaction Id is Invalid",
      });
      return;
    }

    const url = `${BASE_URL}admin/transactions/${transactionId}`;

    try {
      const response = await axios.get(url);

      Toast.show({
        type: "success",
        text1: "The Transaction is Valid",
      });

      return response.data.transaction;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "No transaction data found",
      });
    }
  };

  return (
    <View>
      <Text style={styles.label}>Check Transaction</Text>
      <TextInput
        placeholder="Enter Transaction ID"
        value={transactionId}
        onChangeText={(text) => setTransactionId(text)}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={getTransactionValidate}>
        <Text style={styles.buttonText}>Check Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ValidateCustomer;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
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
