import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <Button title="Log In" onPress={handleLoginPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default StartScreen;
