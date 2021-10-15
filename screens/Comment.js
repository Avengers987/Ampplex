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
  ScrollView,
} from "react-native";
import EmojiBoard from "react-native-emoji-board";
import LottieView from "lottie-react-native";

const Comment = ({ route }) => {
  // Props - postID, pressedUserID, userName
  const [experience, setExperience] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  const onClick = (emoji) => {
    setExperience(experience + emoji.code);
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
    <>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {response != null ? (
          response.map((element, index) => {
            return (
              <>
                <View style={styles.commentView} key={index}>
                  {/* Profile_Picture */}
                  <View>
                    <Image
                      source={{ uri: element.ImgPath }}
                      style={styles.profilePicture}
                    />
                  </View>
                  <View>
                    <Text style={styles.UserName}>{element.UserName}</Text>
                  </View>
                  <View
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      top: 27,
                      left: 80,
                    }}
                  >
                    <Text>{element.Comment}</Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      top: 10,
                    }}
                  />
                </View>
              </>
            );
          })
        ) : (
          <View style={styles.container}>
            <LottieView
              source={require("../assets/lottie/not-found.json")}
              autoPlay
              loop={true}
            />
            <Text
              style={{
                position: "absolute",
                top: 10,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              No comments found!
            </Text>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          backgroundColor: "#fafafa",
          width: "90%",
          height: 55,
          borderRadius: 70,
          position: "absolute",
          bottom: showEmoji ? 300 : 30,
          elevation: 10,
          left: 20,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
        >
          <TextInput
            placeholder={"Express your experience..."}
            style={styles.ExperienceInput}
            onChangeText={(e) => setExperience(e)}
            value={experience}
          />
        </KeyboardAvoidingView>
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
      <EmojiBoard
        showBoard={showEmoji}
        onClick={onClick}
        onRemove={() => setShowEmoji(false)}
      />
    </>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  commentView: {
    width: "85%",
    height: 90,
    backgroundColor: "#fafafa",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 100,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: "absolute",
    left: -150,
    top: 5,
  },
  UserName: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
