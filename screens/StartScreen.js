import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StartScreen = ({ navigation }) => {
  const logoOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

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
    setTimeout(() => {
      canNavigateToHomeScreen();
    }, 2200);
  }, []);

  return (
    <Animated.View
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: logoOpacity,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 80,
          transform: [{ rotate: "180deg" }],
          elevation: 45,
          borderRadius: 100,
        }}
      >
        V
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "sans-serif-medium",
        }}
      >
        Ampplex
      </Text>
    </Animated.View>
  );
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
