import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import ItemCards from "@/src/components/ItemCards";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "@/src/hooks/useAuth";
import PleaseLogin from "@/src/components/PleaseLogin";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  navigate(arg0: string): void;
};

export default function TabTwoScreen() {
  const isLoggedIn = useAuth();
  console.log(isLoggedIn, "two.tsx");

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
            <Text>Your Cart : </Text>
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
});
