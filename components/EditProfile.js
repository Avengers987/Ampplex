import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const EditProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.EditProfileBtn}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 17,
            alignSelf: "center",
            color: "white",
          }}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>
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
  EditProfileBtn: {
    width: 130,
    height: 30,
    position: "absolute",
    top: 120,
    backgroundColor: "skyblue",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    left: -30,
  },
});
