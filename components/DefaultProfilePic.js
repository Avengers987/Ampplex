import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DefaultProfilePic = () => {
  return (
    <View style={styles.container}>
      <View style={styles.OuterCircle}>
        <View style={styles.head} />
        <View style={styles.arm} />
      </View>
    </View>
  );
};

export default DefaultProfilePic;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  OuterCircle: {
    backgroundColor: "#fff",
    width: 120,
    height: 120,
    position: "absolute",
    top: 50,
    borderRadius: 120,
  },
  head: {
    backgroundColor: "lightgrey",
    width: 37,
    height: 37,
    borderRadius: 40,
    alignSelf: "center",
    position: "absolute",
    top: 20,
  },
  arm: {
    backgroundColor: "lightgrey",
    width: 70,
    height: 35,
    position: "absolute",
    alignSelf: "center",
    top: 65,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});
