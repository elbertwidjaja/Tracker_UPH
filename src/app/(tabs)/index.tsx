import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "@/src/components/Themed";
import ItemReminderCard from "@/src/components/ItemReminderCard";
import ItemCards from "@/src/components/ItemCards";

export default function TabOneScreen({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back Elbert</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ItemCards />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
