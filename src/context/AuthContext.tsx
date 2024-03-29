import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "@/env";

type RootStackParamList = {
  navigate(arg0: string): void;
};

type AuthContextType = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigation = useNavigation<RootStackParamList>();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLoggedIn();
  }, []);

  const navigateToHome = () => navigation.navigate("index");
  const navigateToAdmin = () => navigation.navigate("admin");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { fetchData } = useFetch();

  const login = async (email: string, password: string) => {
    const urlAdmin = `${BASE_URL}admin/login`;
    const url = `${BASE_URL}login`;
    const method = "POST";
    const body = { email, password };

    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (!email || !password) {
      return;
    }

    if (email.startsWith("admin")) {
      const responseData = await fetchData(urlAdmin, method, body);
      await AsyncStorage.setItem("token", responseData.data.token);

      navigateToAdmin();
    } else {
      const responseData = await fetchData(url, method, body);
      await AsyncStorage.setItem("token", responseData.data.token);

      setIsLoggedIn(true);

      return navigateToHome();
    }
  };

  const logout = async () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
    navigation.navigate("index");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
