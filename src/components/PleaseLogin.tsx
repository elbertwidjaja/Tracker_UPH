import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  navigate(arg0: string): void;
};

function PleaseLogin() {
  const navigation = useNavigation<RootStackParamList>();

  const handleLogin = () => {
    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please Login First</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#C8A2C8",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export default PleaseLogin;
