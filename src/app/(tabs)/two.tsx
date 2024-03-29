import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import ItemCards from "@/src/components/ItemCards";
import { Ionicons } from "@expo/vector-icons";
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
            <Ionicons name="bag-add" size={24} color="black" />
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
    backgroundColor: "#ADD8E6",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  addItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "black",
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
