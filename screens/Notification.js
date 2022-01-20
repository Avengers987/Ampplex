import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
