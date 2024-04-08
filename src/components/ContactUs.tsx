import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ContactUsCard = () => {
  const handleWhatsAppPress = () => {
    const phoneNumber = "081260798000";
    Linking.openURL(`https://wa.me/${phoneNumber}`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.description}>
        Need assistance? Chat with us on WhatsApp to learn more about our
        application.
      </Text>
      <TouchableOpacity onPress={handleWhatsAppPress} style={styles.button}>
        <FontAwesome name="whatsapp" size={24} color="white" />
        <Text style={styles.buttonText}>Chat with Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#25D366",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
  },
});

export default ContactUsCard;
