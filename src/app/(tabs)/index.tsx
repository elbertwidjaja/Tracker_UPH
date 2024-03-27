import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "@/src/components/Themed";
import { useNavigation } from "expo-router";
import useAuth from "@/src/hooks/useAuth";
import useFetch from "@/src/hooks/useFetch";
import { CronJob } from "cron";

type RootStackParamList = {
  navigate(arg0: string): void;
};

export default function TabOneScreen() {
  const navigation = useNavigation<RootStackParamList>();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { fetchData } = useFetch();

  console.log(isLoggedIn, "ini di index.tsx");

  const getNotification = async () => {
    // const token = await AsyncStorage.getItem("token");
    const url = "http://localhost:3000/api/notification";
    const method = "GET";
    const body = "";
    const data = await fetchData(url, method, body);

    console.log(data, "data");
  };

  // const job = new CronJob(
  //   "*/10 * * * * *", // cronTime (runs every 10 seconds)
  //   function () {
  //     console.log("You will see this message every 10 seconds in Jakarta time");
  //   }, // onTick
  //   null, // onComplete
  //   true, // start
  //   "Asia/Jakarta" // timeZone
  // );
  // job.start();

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
