import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import ItemCards from "@/src/components/ItemCards";
import { FontAwesome } from "@expo/vector-icons";
import PleaseLogin from "@/src/components/PleaseLogin";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/src/context/AuthContext";

type RootStackParamList = {
  navigate(arg0: string): void;
};

export default function TabTwoScreen() {
  const { isLoggedIn } = useAuth();

  const navigation = useNavigation<RootStackParamList>();

  return (
    <>
      {!isLoggedIn ? (
        <PleaseLogin />
      ) : (
        <>
          <TouchableOpacity
            style={styles.addItemContainer}
            onPress={() => navigation.navigate("modal")}
          >
            <FontAwesome name="shopping-basket" size={24} color="white" />
            <Text style={styles.addItemText}>Add Item</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.yourCartText}>Your Cart</Text>
            <ItemCards />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addItemContainer: {
    flexDirection: "row",
    backgroundColor: "#4CAF50", // Green color
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  addItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "white", // White color
  },
  yourCartText: {
    marginTop: 24,
    marginBottom: 18,
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
