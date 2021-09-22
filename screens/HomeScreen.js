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
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./Profile";
import Header from "./Header";
import { Video, AVPlaybackStatus } from "expo-av";

const HomeScreen = () => {
  let [response, setResponse] = useState([]);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const getPostInfo = async () => {
    const url = "https://ampplex-backened.herokuapp.com/GetPostJson/";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data);
      });
  };

  getPostInfo(); // Calling the getPost API for retrieving user posts

  return (
    <View style={styles.Profile}>
      <Header />
      <ScrollView>
        {response.map((element) => {
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
                <View style={styles.UserNameContainer}>
                  <Text style={styles.UserName}>{element["UserName"]}</Text>
                </View>
                {element.Type == "Image" ? (
                  <Image
                    source={{
                      uri: element["ImgPath"],
                    }}
                    style={styles.postImg}
                  />
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
                    onLoadStart={() => console.log("Loading...")}
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                  />
                )}
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
        })}
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
  },
  Profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  postView: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 1.1,
    backgroundColor: "white",
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
