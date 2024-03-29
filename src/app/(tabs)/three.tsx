import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "../../components/Themed";
import { useAuth } from "@/src/context/AuthContext";
import PleaseLogin from "@/src/components/PleaseLogin";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetch from "@/src/hooks/useFetch";
import { BASE_URL } from "@/env";

type Profile = {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
};

type RootStackParamList = {
  navigate(arg0: string): void;
};

export default function Three() {
  const { isLoggedIn, logout } = useAuth();
  const { fetchData } = useFetch();
  const [profileData, setProfileData] = useState<Profile>({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
  });

  const getCustomerData = async () => {
    const token = await AsyncStorage.getItem("token");
    const url = `${BASE_URL}profile`;
    const method = "GET";
    const body = "";
    const headers = { Authorization: `Bearer ${token}` };

    const customerData = await fetchData(url, method, body, headers);
    setProfileData(customerData.data[0]);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <PleaseLogin />
      ) : (
        <View style={styles.container}>
          <Text style={styles.cardTitle}>About You</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.aboutYouContent} onPress={() => {}}>
              <Text>
                Nama : {profileData.first_name} {profileData.last_name}
              </Text>
              <Text>Alamat : {profileData.address}</Text>
              <Text>Email : {profileData.email}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.cardTitle}>Pengaturan Akun</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.cardContent} onPress={() => {}}>
              <Text>Ubah Password</Text>
              <Ionicons name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.cardTitle}>Bantuan</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.cardContent} onPress={() => {}}>
              <Text>Syarat dan Kebijakan</Text>
              <Ionicons name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={styles.cardContent} onPress={() => {}}>
              <Text>Kebijakan Privasi</Text>
              <Ionicons name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={styles.cardContent} onPress={() => {}}>
              <Text>Rate ExpiRemind</Text>
              <Ionicons name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={styles.cardContent} onPress={() => {}}>
              <Text>Hubungi Kami</Text>
              <Ionicons name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Logout" onPress={logout} />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  aboutYouContent: {
    flexDirection: "column",
  },
  card: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
});
