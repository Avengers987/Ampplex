import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

export default function AddPost() {
  const PostBtn = () => {
    return (
      <>
        <View style={styles.container}>
          <TextInput
            style={styles.PostInputStyle}
            placeholder="What's on your mind?"
          />
        </View>
        <ActionButton buttonColor="#7b68ee">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Camera"
            onPress={() => console.log("Camera tapped!")}
          >
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Choose pictures"
            onPress={() => {
              console.log("Choose pictures tapped!");
            }}
          >
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </>
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
    fontSize: 25,
    marginTop: 60,
    fontWeight: "bold",
  },
});
