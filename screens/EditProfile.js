import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const EditProfile = () => {
  return (
    <View style={styles.container}>
      <Text>This is Edit Profile</Text>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
