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
  TouchableOpacity,
} from "react-native";
import EmojiBoard from "react-native-emoji-board";

const Comment = ({}) => {
  // Props - postID, pressedUserID, userName
  const [experience, setExperience] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const onClick = (emoji) => {
    console.log(emoji.code);
    setExperience(experience + emoji.code);
    setShowEmoji(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
    >
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#fafafa",
            width: "90%",
            height: 55,
            borderRadius: 70,
            position: "absolute",
            bottom: showEmoji ? 300 : 100,
            elevation: 10,
          }}
        >
          <TextInput
            placeholder={"Express your experience..."}
            style={styles.ExperienceInput}
            onChangeText={(e) => setExperience(e)}
            value={experience}
          />
          <TouchableOpacity
            style={{
              width: "15%",
              height: "65%",
              position: "absolute",
              bottom: 10,
              borderRadius: 100,
            }}
            onPress={() => {
              showEmoji ? setShowEmoji(false) : setShowEmoji(true);
              console.log("Pressed emoji button!");
            }}
          >
            <View>
              <Image
                source={require("../Images/emoji-icon.png")}
                style={styles.emoji}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postBTn}
            onPress={() => console.log("Pressed Post button!")}
          >
            <Text
              style={{
                color: "skyblue",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
        <EmojiBoard showBoard={showEmoji} onClick={onClick} />
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
  ExperienceInput: {
    fontSize: 16,
    paddingTop: 12,
    paddingLeft: 50,
    paddingRight: 65,
  },
  emoji: {
    position: "absolute",
    bottom: -35,
    left: 10,
    width: 30,
    height: 30,
  },
  postBTn: {
    width: "20%",
    height: "50%",
    position: "absolute",
    bottom: 10,
    right: -15,
  },
});
