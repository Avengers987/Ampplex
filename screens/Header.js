import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
  },
  HeaderTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
});
