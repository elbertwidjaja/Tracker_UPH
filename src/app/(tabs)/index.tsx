import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "@/src/components/Themed";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  navigate(arg0: string): void;
};

export default function TabOneScreen() {
  const navigation = useNavigation<RootStackParamList>();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to ExpiRemind</Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Ionicons name="log-in-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
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
