import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Commens = () => {
  return (
    <View>
      <Text style={styles.container}>Comments</Text>
    </View>
  );
};

export default Commens;

const styles = StyleSheet.create({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
