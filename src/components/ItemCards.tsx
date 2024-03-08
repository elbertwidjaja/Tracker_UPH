import React, { useEffect } from "react";
import { Text, View } from "./Themed";
import useFetch from "../hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ItemCards() {
  const { fetchData } = useFetch();

  useEffect(() => {
    const test = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token, "toeken");

      const url = "http://localhost:3000/api/transaction/customer";
      const method = "GET";
      const body = "";
      const headers = { Authorization: `Bearer ${token}` };
      const responseData = await fetchData(url, method, body, headers);
      console.log(responseData, "data");
    };
    test();
  }, []);

  return (
    <View>
      <Text>ITEMCARD</Text>
    </View>
  );
}

export default ItemCards;
