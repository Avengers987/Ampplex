import React, { useState, useRef, createRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import ActionSheet from "react-native-actions-sheet";
import { useDeviceOrientation } from "@react-native-community/hooks";
import Like4 from "../components/Like4";

const LongVideo = ({
  imgPath,
  caption,
  postID,
  userID,
  timestamp,
  myUserId,
  navigation,
}) => {
  const [Muted, setIsMuted] = useState(true);
  const actionSheetRef = createRef();
  const orientation = useDeviceOrientation().portrait
    ? "portrait"
    : "landscape";
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [response, setResponse] = useState(null);
  const [views, setViews] = useState(0);

  const testing_video =
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4";

  const IncreaseViewCount = async () => {
    const url = `https://ampplex-backened.herokuapp.com/IncreaseViewCount/${postID}/${userID}`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const GetViewCount = async () => {
    const url = `https://ampplex-backened.herokuapp.com/GetViewCount/${postID}/${userID}`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.ViewCount);
        setViews(data.ViewCount);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <View>
      <StatusBar style="light" />
      <TouchableWithoutFeedback
        onPress={() => {
          setIsMuted(true);
          actionSheetRef.current?.setModalVisible();
          if (userID != undefined) {
            IncreaseViewCount();
          }
          GetViewCount();
        }}
        style={styles.videoContainer}
      >
        <Video
          style={styles.video}
          source={{
            uri: imgPath,
          }}
          resizeMode={"contain"}
          onLoadStart={() => {
            console.log("onLoadStart");
          }}
          onLoad={() => {
            console.log("onLoad");
            setLoading1(false);
          }}
          isLooping={true}
          paginEnabled={true}
          shouldPlay={true}
          isMuted={Muted}
        />
      </TouchableWithoutFeedback>
      {loading1 ? (
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            top: 90,
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : null}
      <Pressable
        style={{
          alignSelf: "center",
          position: "absolute",
          top: Dimensions.get("window").height / 20,
          left: Dimensions.get("window").width / 1.2,
        }}
        onPress={() => setIsMuted(!Muted)}
      >
        {Muted == false ? (
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require("../assets/images/speaker-icon.png")}
          />
        ) : (
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require("../assets/images/mute-icon.png")}
          />
        )}
      </Pressable>
      <ActionSheet ref={actionSheetRef} bounceOnOpen={false}>
        <View style={styles.ActionSheetStyle}>
          <Video
            useNativeControls={true}
            style={{
              width:
                orientation == "portrait"
                  ? 400
                  : Dimensions.get("window").width,
              height:
                orientation == "portrait"
                  ? 300
                  : Dimensions.get("window").height,
              position: "absolute",
              backgroundColor: "black",
              top:
                orientation == "portrait"
                  ? -Dimensions.get("window").height / 11.7
                  : -Dimensions.get("window").height / 14,
            }}
            source={{
              uri: imgPath,
            }}
            resizeMode={"cover"}
            onLoadStart={() => {
              console.log("onLoadStart");
            }}
            onLoad={() => {
              console.log("onLoad");
              setLoading2(false);
            }}
            onError={() => {
              console.log("Error while loading video");
            }}
            isLooping={true}
            paginEnabled={true}
            shouldPlay={true}
            isMuted={false}
          />
          {loading2 ? (
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                top:
                  orientation == "portrait"
                    ? Dimensions.get("window").height / 10
                    : Dimensions.get("window").height / 3,
                left: Dimensions.get("window").width / 2,
              }}
            >
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : null}
          {orientation == "portrait" ? (
            <View style={styles.BottomComponentStyle}>
              <View style={styles.caption}>
                <Text style={styles.text}>{caption}</Text>
              </View>
              <View style={styles.Views}>
                <Text style={styles.viewsText}>
                  {views} views • {timestamp}
                </Text>
              </View>
              <View style={styles.breakpointStyle} />
              <View style={styles.Like}>
                <Like4
                  postID={postID}
                  myUserId={myUserId}
                  pressedUserID={userID}
                />
              </View>
              <TouchableOpacity
                style={{
                  marginLeft: Dimensions.get("window").width / 3.7,
                  marginTop: Dimensions.get("window").height / 8,
                }}
                onPress={() => {
                  let clickedUserID = userID;
                  let myUserID = myUserId;

                  navigation.navigate("Comments", {
                    myUserID,
                    clickedUserID,
                    postID,
                  });
                }}
              >
                <Image
                  style={styles.comment}
                  source={require("../Images/comment-icon.png")}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
        </View>
      </ActionSheet>
    </View>
  );
};

export default LongVideo;

const styles = StyleSheet.create({
  videoContainer: {
    width: 400,
    height: 300,
    borderRadius: 20,
  },
  video: {
    width: 400,
    height: 228,
    backgroundColor: "black",
  },
  ActionSheetStyle: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  caption: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    left: 10,
  },
  text: {
    fontSize: 17,
    fontFamily: "sans-serif-medium",
  },
  BottomComponentStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.3,
    position: "absolute",
    top: Dimensions.get("window").height / 3.3,
  },
  Views: {
    position: "absolute",
    marginTop: Dimensions.get("window").height / 16.5,
    alignSelf: "center",
    left: 10,
  },
  viewsText: {
    fontSize: 13,
    fontFamily: "sans-serif-medium",
    color: "grey",
  },
  breakpointStyle: {
    backgroundColor: "lightgrey",
    width: Dimensions.get("window").width,
    height: 1,
    position: "absolute",
    top: Dimensions.get("window").height / 8.8,
  },
  Like: {
    position: "absolute",
    top: Dimensions.get("window").height / 10,
  },
  comment: {
    width: 28,
    height: 28,
  },
});
