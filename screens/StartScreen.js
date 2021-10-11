import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const StartScreen = ({ navigation }) => {
  const canNavigateToHomeScreen = async () => {
    // This function Handles the navigation, if user is using this app for the first time then he/she will be navigated to the Onboarding screen else user will be navigated directly to the Home Screen.
    const isLogined = await AsyncStorage.getItem("isLogined_Boolean");
    const userName = await AsyncStorage.getItem("user_name");
    const userID = await AsyncStorage.getItem("user_id");
    const onboarding = await AsyncStorage.getItem("onboarding");
    const category = await AsyncStorage.getItem("Category");

    if (
      isLogined === "true" &&
      userName !== null &&
      userID !== null &&
      onboarding === "true" &&
      category === "true"
    ) {
      // User is not running this app for the first time
      navigation.replace("Home", { userID, userName });
    } else {
      // User is running this app for the first time
      navigation.navigate("OnBoarding");
    }
  };

  useEffect(() => {
    canNavigateToHomeScreen();
  }, []);

  return <View />;
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  LinearGradient: {
    width: "100%",
    height: "100%",
  },
  activityIndicator: {
    position: "absolute",
    bottom: 50,
    left: Dimensions.get("window").width / 2.2,
  },
});
