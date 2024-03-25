import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";

type RootStackParamList = {
  navigate(arg0: string): void;
};

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const navigation = useNavigation<RootStackParamList>();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem("token");

      console.log(token, "tpken");

      setIsLoggedIn(!!token);
    };
    checkLoggedIn();
  }, [isLoggedIn]);

  const login = async () => {};

  const logout = async () => {
    AsyncStorage.clear();
    console.log("Berhasil Logout");
    setIsLoggedIn(false);
    navigation.navigate("index");
  };

  return { isLoggedIn, setIsLoggedIn, logout };
}

export default useAuth;
