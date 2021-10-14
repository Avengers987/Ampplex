import React, { useState, useEffect } from "react";
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

const Comment = ({ route }) => {
  // Props - postID, pressedUserID, userName
  const [experience, setExperience] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  let [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  const onClick = (emoji) => {
    console.log(emoji.code);
    setExperience(experience + emoji.code);
    setShowEmoji(false);
  };

  const PostComment = async () => {
    const url = `https://ampplex-backened.herokuapp.com/Comment/${route.params.myUserID}/${route.params.clickedUserID}/${route.params.postID}/${experience}`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExperience("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getComments = async () => {
    const url = `https://ampplex-backened.herokuapp.com/getComments/${route.params.clickedUserID}/${route.params.postID}`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        // console.log(data);
        setResponse(data);
      })
      .catch((error) => {
        setResponse(null);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);

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
            onPress={() => {
              if (experience.length > 0) {
                PostComment();
                getComments();
              }
            }}
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
