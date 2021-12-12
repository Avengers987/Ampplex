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
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import EmojiBoard from "react-native-emoji-board";
import LottieView from "lottie-react-native";
import More_comment from "../components/More_comment";
import Block_report from "../components/Block_report";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Comment = ({ route, navigation }) => {
  // Props - postID, clickedUserID, myUserID

  const [experience, setExperience] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const clickedUserID = route.params.clickedUserID;
  const postID = route.params.postID;
  const myUserID = route.params.myUserID;

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
        getComments();
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getComments();
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: "40%",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {response != null && loading ? (
          <LottieView
            style={styles.LoadingIndicator}
            source={require("../assets/lottie/comment-loading.json")}
            autoPlay
            loop={true}
          />
        ) : response != null ? (
          response.map((element, index) => {
            return (
              <>
                <View style={styles.commentView} key={index}>
                  {/* Profile_Picture */}
                  {route.params.myUserID == element.myUserID ? (
                    <More_comment
                      clickedUserID={clickedUserID}
                      postID={postID}
                      commentID={element.Comment_ID}
                    />
                  ) : (
                    <Block_report
                      userID={element.myUserID}
                      myUserID={myUserID}
                      commentID={element.Comment_ID}
                    />
                  )}
                  {element.ImgPath != null ? (
                    <View>
                      <Image
                        source={{ uri: element.ImgPath }}
                        style={styles.profilePicture}
                      />
                    </View>
                  ) : (
                    <View>
                      <Image
                        style={styles.profilePicture}
                        source={require("../assets/images/default_profile_picture.png")}
                      />
                    </View>
                  )}
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
                    <Text style={{}}>{element.Comment}</Text>
                  </View>
                </View>
              </>
            );
          })
        ) : (
          <>
            <LottieView
              source={require("../assets/lottie/not-found.json")}
              autoPlay
              style={{
                width: "80%",
                height: "100%",
                marginTop: 20,
                alignSelf: "center",
              }}
              loop={true}
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                alignSelf: "center",
                position: "absolute",
                bottom: 50,
              }}
            >
              No comments found!
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                alignSelf: "center",
                position: "absolute",
                bottom: 20,
              }}
            >
              Be the first to comment!
            </Text>
          </>
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
            spellCheck={true}
            autoCorrect={true}
            maxLength={100}
            autoFocus={true}
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
    width: "90%",
    height: 90,
    backgroundColor: "#fafafa",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 12,
    elevation: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: "absolute",
    left: -160,
    alignSelf: "flex-start",
    top: 10,
  },
  UserName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  LoadingIndicator: {
    alignSelf: "center",
    width: 350,
    height: 350,
  },
});
