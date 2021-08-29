import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.HeaderTitle}>Ampplex</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
  },
  HeaderTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
});
