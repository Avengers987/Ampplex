import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./Profile";

const HomeScreen = () => {
  return (
    <>
      <View style={styles.Profile}>
        <Text
          style={{
            marginTop: Dimensions.get("window").width,
            position: "absolute",
            top: -50,
          }}
        >
          Home
        </Text>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
