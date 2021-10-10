import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  return (
    <View style={styles.container}>
      <Text style={styles.AppName}>Ampplex</Text>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  AppName: {
    fontWeight: "bold",
    fontSize: 30,
  },
});
