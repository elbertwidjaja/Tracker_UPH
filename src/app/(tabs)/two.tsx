import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import ItemCards from "@/src/components/ItemCards";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import useAuth from "@/src/hooks/useAuth";
import PleaseLogin from "@/src/components/PleaseLogin";

export default function TabTwoScreen() {
  const isLoggedIn = useAuth();

  return (
    <>
      {!isLoggedIn ? (
        <PleaseLogin />
      ) : (
        <>
          <View style={styles.addItemContainer}>
            <Link href="/modal">
              <Ionicons name="bag-add" size={24} color="black" />
            </Link>
            <Text>Add Item</Text>
          </View>
          <View style={styles.container}>
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
    padding: 15,
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
