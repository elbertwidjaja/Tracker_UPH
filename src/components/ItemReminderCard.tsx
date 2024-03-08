import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const ItemReminderCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={
            "https://assets.kelasfitness.com/poster_img/event-1708926779932-3229/size-high.webp"
          }
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bola Lampu</Text>
          <Text style={styles.expiry}>Expires on: 01/01/2025</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  expiry: {
    color: "#777",
  },
});

export default ItemReminderCard;
