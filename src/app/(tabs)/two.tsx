import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import ItemCards from "@/src/components/ItemCards";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabTwoScreen() {
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);
    };
    getToken();
  }, []);

  return (
    <View style={styles.container}>
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
});
