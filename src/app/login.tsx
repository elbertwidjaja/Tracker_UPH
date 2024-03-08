import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useFetch from "../hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  navigate(arg0: string): void;
};

interface UserData {
  customerId: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  password: string;
}

export default function Login() {
  const navigation = useNavigation<RootStackParamList>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchData } = useFetch();

  const login = async () => {
    const url = "http://localhost:3000/api/login";
    const method = "POST";
    const body = { email, password };

    try {
      const responseData = await fetchData(url, method, body);

      if (responseData.data.token) {
        await AsyncStorage.setItem("token", responseData.data.token);
        navigateToHome();
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data");
    }
  };

  const navigateToHome = () => navigation.navigate("index");
  const navigateToSignup = () => navigation.navigate("signup");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={navigateToSignup}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "80%",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: "#28a745",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
