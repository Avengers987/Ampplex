import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
} from "react-native";

const Comment = () => {
  const [experience, setExperience] = useState(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
    >
      <View style={styles.container}>
        <View style={styles.CommentBox}>
          <TextInput
            placeholder={"Express your experience..."}
            style={styles.ExperienceInput}
            onChangeText={(e) => setExperience(e)}
          />
          <Pressable
            onPress={() => {
              console.log("Pressed");
            }}
          >
            <View>
              <Image
                source={require("../Images/emoji-icon.png")}
                style={styles.emoji}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  CommentBox: {
    backgroundColor: "#fafafa",
    width: Dimensions.get("window").width / 1.2,
    height: 55,
    borderRadius: 70,
    position: "absolute",
    bottom: 100,
    elevation: 10,
  },
  ExperienceInput: {
    fontSize: 16,
    paddingTop: 12,
    paddingLeft: 55,
    paddingRight: 15,
  },
  emoji: {
    position: "absolute",
    bottom: -1,
    left: 15,
    width: 30,
    height: 30,
  },
});
