import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token, "tpken");

      setIsLoggedIn(!!token);
    };

    checkLoggedIn();
  }, []);

  return isLoggedIn;
}

export default useAuth;
