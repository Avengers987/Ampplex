import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Home page</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
