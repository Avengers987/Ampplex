import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

export default function AddPost() {
  const PostBtn = () => {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.PostInputStyle}
          placeholder="What's on your mind?"
        />
      </View>
    );
  };

  return (
    <>
      <PostBtn />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f5f7",
  },
  PostInputStyle: {
    fontSize: 20,
    marginTop: 60,
  },
});
