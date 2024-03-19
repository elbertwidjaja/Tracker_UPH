import { StyleSheet } from "react-native";
import React from "react";
import FormItem from "../components/FormItem";
import ValidateCustomer from "../components/ValidateCustomer";
import { View } from "../components/Themed";

function admin() {
  return (
    <>
      <View style={styles.container}>
        <FormItem />
        <br />
        <ValidateCustomer />
      </View>
    </>
  );
}

export default admin;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
