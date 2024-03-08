import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import ItemCards from "@/src/components/ItemCards";
import useFetch from "@/src/hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function TabTwoScreen() {
  const { fetchData } = useFetch();

  const handlePress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const url = "http://localhost:3000/api/some-api-endpoint";
      const method = "GET";
      const body = "";
      const headers = { Authorization: `Bearer ${token}` };
      const responseData = await fetchData(url, method, body, headers);

      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Link href="/modal">
          <Ionicons name="bag-add" size={24} color="purple" />
        </Link>
      </TouchableOpacity>
      <ItemCards />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});
