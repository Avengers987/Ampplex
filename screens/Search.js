import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const Search = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ width: 60, height: 60, borderRadius: 50 }} />
      <View style={{ marginLeft: 20 }}>
        <View style={{ width: 120, height: 20, borderRadius: 4 }} />
        <View
          style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
        />
      </View>
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
