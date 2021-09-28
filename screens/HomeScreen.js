import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Profile from "./Profile";
import Header from "./Header";
import { Video, AVPlaybackStatus } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation, userID }) => {
  let [response, setResponse] = useState([]);
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const DOUBLE_PRESS_DELAY = 300;
  const [lastTap, setLastTap] = useState(null);

  const getPostInfo = async () => {
    const url = "https://ampplex-backened.herokuapp.com/GetPostJson/";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handledDoubleTap = (event) => {
    if (lastTap && Date.now() - lastTap < DOUBLE_PRESS_DELAY) {
      liked ? setLiked(false) : setLiked(true);
    } else {
      setLastTap(Date.now());
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    navigation.replace("Home", { userID, navigation });
  }, []);

  getPostInfo(); // Calling the getPost API for retrieving user posts

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View
            style={{
              alignSelf: "center",
              marginTop: Dimensions.get("window").height / 2.5,
            }}
          >
            <ActivityIndicator size="large" color="skyblue" />
          </View>
        ) : (
          response.map((element) => {
            return (
              <>
                <View style={styles.postView}>
                  <View>
                    {/*Profile Picture*/}
                    <Image
                      style={styles.profilePicture}
                      source={{
                        uri:
                          element["profilePicPath"] != "null"
                            ? element["profilePicPath"]
                            : "https://images.unsplash.com/photo-1514923995763-768e52f5af87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.UserNameContainer}
                    onPress={() => {
                      console.log(`User Id of the user is : ${element.UserID}`);
                      const clickedUserID = element.UserID;
                      const clickedUserName = element.UserName;
                      const myUserId = userID;
                      console.log(userID);
                      navigation.navigate("UserProfile", {
                        clickedUserID,
                        clickedUserName,
                        myUserId,
                      });
                    }}
                  >
                    <Text style={styles.UserName}>{element["UserName"]}</Text>
                  </TouchableOpacity>
                  {element.Type == "Image" ? (
                    <TouchableWithoutFeedback
                      onPress={() => handledDoubleTap()}
                    >
                      <Image
                        importantForAccessibility={"yes"}
                        source={{
                          uri: element.ImgPath,
                        }}
                        style={styles.postImg}
                      />
                    </TouchableWithoutFeedback>
                  ) : (
                    <Video
                      ref={video}
                      style={styles.video}
                      source={{
                        uri: element.ImgPath,
                      }}
                      useNativeControls
                      resizeMode="cover"
                      isLooping
                      onMoveShouldSetResponder={() => console.log("Touched!")}
                      onPlaybackStatusUpdate={(status) =>
                        setStatus(() => status)
                      }
                    />
                  )}

                  <TouchableOpacity
                    onPress={() => setLiked((isLiked) => !isLiked)}
                  >
                    <MaterialCommunityIcons
                      name={liked ? "heart" : "heart-outline"}
                      size={32}
                      style={{
                        marginLeft: 20,
                      }}
                      color={liked ? "red" : "black"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginLeft: 90,
                      marginTop: -30,
                    }}
                    onPress={() => console.log("Comment button pressed!")}
                  >
                    <Image source={require("../Images/comment-icon.png")} />
                  </TouchableOpacity>
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        alignSelf: "flex-start",
                        marginLeft: 20,
                        marginTop: 10,
                      }}
                    >
                      {element["Caption"]}
                    </Text>
                  </View>
                </View>
              </>
            );
          })
        )}
        <View
          style={{
            height: 55,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  postView: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 1.1,
    backgroundColor: "#fafafa",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 30,
  },
  postImg: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 1.5,
    borderRadius: 20,
    marginTop: 10,
  },
  UserName: {
    fontSize: 19,
    fontWeight: "bold",
  },
  UserNameContainer: {
    marginLeft: 80,
    position: "absolute",
    top: 20,
  },
  profilePicture: {
    width: 43,
    height: 43,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 15,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  video: {
    alignSelf: "center",
    width: 365,
    height: 490,
    borderRadius: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
