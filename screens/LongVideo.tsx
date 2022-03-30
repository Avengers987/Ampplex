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
  TouchableHighlight
} from "react-native";
import { Video } from "expo-av";
import ActionSheet from "react-native-actions-sheet";
import { useDeviceOrientation } from "@react-native-community/hooks";
import Like4 from "../components/Like4";
import LottieView from "lottie-react-native";
import { LinearGradient } from 'expo-linear-gradient';

type LongVideo_Props = {
  navigation: any;
  imgPath: string;
  caption: string;
  postID: string;
  userID: string;
  timestamp: string;
  myUserId: string;
  userName: string;
}

const LongVideo = ({
  imgPath,
  caption,
  postID,
  userID,
  timestamp,
  myUserId,
  navigation,
  userName
}: LongVideo_Props) => {
  const [Muted, setIsMuted] = useState<boolean>(true);
  const actionSheetRef: any = createRef();
  const orientation: string = useDeviceOrientation().portrait
    ? "portrait"
    : "landscape";
  const [loading1, setLoading1] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [views, setViews] = useState<number>(0);

  const testing_video: string =
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4";

  const IncreaseViewCount = async (): Promise<void> => {
    const url: string = `https://ampplex-backened.herokuapp.com/IncreaseViewCount/${postID}/${userID}`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const GetViewCount = async (): Promise<void> => {
    const url: string = `https://ampplex-backened.herokuapp.com/GetViewCount/${postID}/${userID}`;

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

  const CreateTimeStamp = (time_stamp: string): string => {
    let time_stamp_lst: string | string[] = time_stamp.split("|")[1];
    time_stamp_lst = time_stamp_lst.trim().split(" ");

    const month: string = time_stamp_lst[1];
    const date: number = parseInt(time_stamp_lst[2]);
    const year: number = parseInt(time_stamp_lst[3]);

    const current_year: number = new Date().getFullYear();
    const current_month: string = new Date().toDateString().split(" ")[1];
    const current_date: number = new Date().getDate();

    enum months {
      Jan,
      Feb,
      Mar,
      Apr,
      May,
      Jun,
      Jul,
      Aug,
      Sep,
      Oct,
      Nov,
      Dec,
    };

    if (current_year != year) {
      const yearDifference: number = current_year - year;

      return yearDifference > 1
        ? yearDifference + " years ago"
        : yearDifference + " year ago";
    } else if (current_month === month) {
      const dateDifference: number = current_date - date;

      return dateDifference > 1
        ? dateDifference + " days ago"
        : dateDifference + " day ago";
    } else if (current_month != month) {
      const monthDifference: number = new Date().getMonth() + 1 - (months[month] + 1);

      return monthDifference > 1
        ? monthDifference + " months ago"
        : monthDifference + " month ago";
    }
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
          resizeMode={"cover"}
          onLoadStart={() => {
            console.log("onLoadStart");
          }}
          onLoad={() => {
            console.log("onLoad");
            setLoading1(false);
          }}
          isLooping={true}
          shouldPlay={true}
          isMuted={Muted}
        />
      </TouchableWithoutFeedback>
      {loading1 ? (
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            top: "40%",
            justifyContent: "center",
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
                  ? Dimensions.get("window").width
                  : Dimensions.get("window").width,
              height:
                orientation == "portrait"
                  ? Dimensions.get("window").height / 2.8
                  : Dimensions.get("window").height,
              position: "absolute",
              backgroundColor: "black",
              alignSelf: "center",
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
                  {views} views • {CreateTimeStamp(timestamp)}
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
                  let clickedUserID: string = userID;
                  let myUserID: string = myUserId;

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
            {/* Assignment */}
            
            <View style={styles.AssignmentCard}>
              {userName != undefined ? 
              <Text style={styles.Card_Title}>Hey, {userName.toString().split(' ')[0]}</Text>
              : <View/>}
              <Text style={{
                fontSize: 20,
                fontFamily: "sans-serif-medium",
                fontWeight: "bold",
                color: "#A2A2A2",
                alignSelf: "center",
                marginTop: Dimensions.get("window").height * 0.02,
              }}>Assignments are waiting for you!</Text>

              {/* Complete Assignment buttton */}

              <TouchableHighlight onPress={() => {
                navigation.navigate("Assignments", {userID, postID})
              }} style={{
                marginTop: Dimensions.get("window").height / 4,
                alignSelf: "center",
                backgroundColor: "#fafa",
                width: 300,
                height: 60,
                borderRadius: 40,
                position: "absolute",
              }}>
                <LinearGradient colors={['#E125FF', '#5CD5FF', '#fff']} end={{ x: 2.0, y: 0.2 }} style={styles.linearGradient}>
                  <Text style={styles.assignment_btn}>Complete Assignment</Text>
                </LinearGradient>
              </TouchableHighlight>

            </View>
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    backgroundColor: "black",
    alignSelf: "center",
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
  linearGradient: {
    width: 300,
    height: 60,
    borderRadius: 40,
    elevation: 5,
    alignSelf: "center",
  },
  assignment_btn: {
    fontSize: 18,
    fontFamily: "sans-serif-medium",
    color: "white",
    alignSelf: "center",
    marginTop: Dimensions.get("window").height / 70,
    fontWeight: "bold",
  },
  AssignmentCard: {
    position: "absolute",
    bottom: 110,
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").height / 2.7,
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 8,
    alignSelf: "center",
  }, 
  Card_Title: {
    fontSize: 20,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    color: "#A2A2A2",
    alignSelf: "center",
    marginTop: Dimensions.get("window").height * 0.05,
  }
});
