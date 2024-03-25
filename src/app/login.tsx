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
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import useAuth from "../hooks/useAuth";

type RootStackParamList = {
  navigate(arg0: string): void;
};

export default function Login() {
  const navigation = useNavigation<RootStackParamList>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [token, setToken] = useState("");
  const { fetchData } = useFetch();

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const login = async () => {
    const urlAdmin = "http://localhost:3000/api/admin/login";
    const url = "http://localhost:3000/api/login";
    const method = "POST";
    const body = { email, password };

    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (!email || !password) {
      return;
    }

    if (email.startsWith("admin")) {
      const responseData = await fetchData(urlAdmin, method, body);
      await AsyncStorage.setItem("token", responseData.data.token);

      navigateToAdmin();
    } else {
      const responseData = await fetchData(url, method, body);
      await AsyncStorage.setItem("token", responseData.data.token);

      setIsLoggedIn(true);

      return navigateToHome();
    }
  };

  const navigateToHome = () => navigation.navigate("index");
  const navigateToAdmin = () => navigation.navigate("admin");
  const navigateToSignup = () => navigation.navigate("signup");

  return (
    <>
      <TouchableOpacity style={styles.button_home}>
        <Link href="/">
          <Ionicons name="arrow-back" size={30} color="black" />
        </Link>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          <TextInput
            style={[styles.input, emailError && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="#777"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            onBlur={() => setEmailError(!email)}
          />
          <TextInput
            style={[styles.input, passwordError && styles.inputError]}
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry
            onChangeText={setPassword}
            onBlur={() => setPasswordError(!password)}
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
    </>
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
  inputError: {
    borderColor: "red",
    borderWidth: 1,
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
  button_home: {
    margin: 15,
  },
});
