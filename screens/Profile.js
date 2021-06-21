import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <View style={styles.Profile}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

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
