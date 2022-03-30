import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logined_userID_Context from "../context/Logined_userID/Logined_userID_Context";
import { LinearGradient } from 'expo-linear-gradient';


const StartScreen = ({ navigation }: any) => {
  const logoOpacity: any = new Animated.Value(0);
  const Logined_userID: any = useContext(Logined_userID_Context);
  let borderRadius: Animated.Value = new Animated.Value(10)

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    Animated.timing(borderRadius, {
      delay: 10,
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const canNavigateToHomeScreen = async () => {
    // This function Handles the navigation, if user is using this app for the first time then he/she will be navigated to the Onboarding screen else user will be navigated directly to the Home Screen.
    const isLogined: string = await AsyncStorage.getItem("isLogined_Boolean");
    const userName: string = await AsyncStorage.getItem("user_name");
    const userID: string = await AsyncStorage.getItem("user_id");
    const onboarding: string = await AsyncStorage.getItem("onboarding");
    const category: string = await AsyncStorage.getItem("Category");

    Logined_userID.changeLoginedUserID(userID);

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
      navigation.replace("OnBoarding");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      canNavigateToHomeScreen();
    }, 2500);
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View style={{
        opacity: logoOpacity,
      }}>
        <LinearGradient colors={['#E125FF', '#5CD5FF', '#fff']} end={{ x: 2, y: 0.3 }} style={styles.LinearGradient}>
        <Text
            style={{
              fontWeight: "bold",
              fontSize: 120,
              transform: [{ rotate: "180deg" }],
              borderRadius: 100,
              fontFamily: "sans-serif-medium",
              color: "white",
            }}
          >
            V
          </Text>
      </LinearGradient>
      </Animated.View>

      <Text
        style={{
          fontSize: 50,
          fontFamily: "sans-serif-medium",
          color: "#7C7C7C",
          marginTop: 30,
          fontWeight: "bold",
        }}
      >
        Ampplex
      </Text>
    </View>
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
    width: 230,
    height: 230,
    borderRadius: 230,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    position: "absolute",
    bottom: 50,
    left: Dimensions.get("window").width / 2.2,
  },
});
