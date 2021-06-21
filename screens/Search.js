import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Search = () => {
  return (
    <View style={styles.Profile}>
      <Text>Search</Text>
    </View>
  );
};

export default Search;

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
