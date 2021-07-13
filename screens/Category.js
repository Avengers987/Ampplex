import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Category = () => {
  return (
    <View style={styles.container}>
      <Text>Select your category</Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  TitleStyle: {
    fontWeight: "bold",
  },
});
