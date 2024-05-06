import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

const API_URL =
  "https://ac6a-2001-448a-10d0-e498-55be-b0ec-97fc-82ed.ngrok-free.app/api/customers";

const FetchPage = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Data from API:</Text>
      {data ? <Text>{JSON.stringify(data)}</Text> : <Text>Loading...</Text>}
      <Button title="Refresh" onPress={fetchData} />
    </View>
  );
};

export default FetchPage;
