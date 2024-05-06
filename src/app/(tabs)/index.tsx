import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "@/src/components/Themed";
import { useNavigation } from "@react-navigation/native";
import useFetch from "@/src/hooks/useFetch";
import { BASE_URL } from "@/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTransactionData } from "@/src/context/transactionData";
import { useAuth } from "@/src/context/AuthContext";
import PleaseLogin from "@/src/components/PleaseLogin";
import ContactUsCard from "@/src/components/ContactUs";

type RootStackParamList = {
  navigate(arg0: string): void;
};

export default function TabOneScreen() {
  const formatDate = (dateString: string): string => {
    return dateString.substring(0, 10);
  };

  const { transactionData, setTransactionData } = useTransactionData();
  const navigation = useNavigation<RootStackParamList>();
  const { fetchData } = useFetch();

  const [nearestDue, setNearestDue] = useState([]);
  const [latestItem, setLatestItem] = useState([]);

  const { isLoggedIn } = useAuth();

  const getTransactionItems = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const url = `${BASE_URL}transaction/customer`;
      const method = "GET";
      const body = "";
      const headers = {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      };
      const responseData = await fetchData(url, method, body, headers);

      setTransactionData(responseData.transactions);
      setLatestItem(responseData.transactions);
    } catch (error) {
      console.error(error);
    }
  };

  const getlatestItem = async () => {
    const token = await AsyncStorage.getItem("token");
    const url = `${BASE_URL}notification`;
    const method = "GET";
    const body = "";
    const headers = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    };

    const data = await fetchData(url, method, body, headers);

    setNearestDue(data.data);
  };

  const twoLatestItem = latestItem.slice(-2);

  useEffect(() => {
    if (isLoggedIn) {
      getlatestItem();
      getTransactionItems();
    }
  }, [transactionData.length]);

  return (
    <ScrollView>
      {!isLoggedIn ? (
        <>
          <ContactUsCard />
          <PleaseLogin />
        </>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome to ExpiRemind</Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Ionicons name="log-in-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.homeTitle}>Almost Due Date</Text>
          {nearestDue.map((item: any, index: number) => {
            const dueDate = new Date(item.due_date);
            const currentDate = new Date();
            const timeDiff = dueDate.getTime() - currentDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            let message = "";
            if (daysDiff <= 30) {
              message = "Due in 30 days or less";
            }
            return (
              <View style={styles.card} key={index}>
                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{item.item_name}</Text>
                  <Text>{`Due Date: ${formatDate(item.due_date)}`}</Text>
                  <Text>{`Purchase Date: ${formatDate(
                    item.purchase_date
                  )}`}</Text>
                  <Text>{`Item ID: ${item.item_id}`}</Text>
                  <Text style={styles.remainingDays}>{message}</Text>
                </View>
              </View>
            );
          })}
          <Text style={styles.homeTitle}>Recently Added</Text>
          {twoLatestItem.map((item: any, index: number) => {
            return (
              <View style={styles.card} key={index}>
                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{item.item_name}</Text>
                  <Text>{`Due Date: ${formatDate(item.due_date)}`}</Text>
                  <Text>{`Purchase Date: ${formatDate(
                    item.purchase_date
                  )}`}</Text>
                  <Text>{`Item ID: ${item.item_id}`}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoContainer: {
    flex: 1,
  },
  remainingDays: {
    color: "red",
    fontWeight: "bold",
  },
  homeTitle: {
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 20,
    marginTop: 18,
  },
});
