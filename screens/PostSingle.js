import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  createRef,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { StatusBar } from "expo-status-bar";
import Like from "../components/Like3";
import ActionSheet from "react-native-actions-sheet";
import Modal from "react-native-modal";

const PostSingle = (props) => {
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const clickedUserID = props.userId;
  const clickedUserName = props.UserName;
  const navigation = props.navigation;
  const myUserId = props.myUserId;
  const actionSheetRef = createRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const HandleAudio = () => {
    console.log("Audio controller triggered!");
    setPlay(!play);
  };

  const handleModalClick = () => {
    setModalVisible(!isModalVisible);
  };

  const userNamePressHandler = () => {
    navigation.navigate("UserProfile", {
      clickedUserID,
      clickedUserName,
      myUserId,
    });
  };

  const handleBlock = () => {
    const url = `https://ampplex-backened.herokuapp.com/BlockUser/${props.userId}/${props.myUserId}`;

    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data === "success") {
          alert("User Blocked");
        }
      });
  };

  const handleReport = () => {
    const url = `https://ampplex-backened.herokuapp.com/ReportPost/${props.postID}/${props.userId}/${props.myUserId}/${selectedCategory}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "success") {
          alert(
            "We have sent your request to Ampplex team. Thank you for reporting!"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Some error occured. Please try again later.");
      });
  };

  // useEffect(() => {
  //   console.log(props.url);
  // }, []);

  // const ref = useRef(null);

  // const playVideo = async () => {
  //   if (ref.current == null) {
  //     return;
  //   }
  //   const status = await ref.current.getStatusAsync();
  //   if (status?.isPlaying) {
  //     return;
  //   } else {
  //     try {
  //       ref.current.playAsync();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };

  // const stop = async () => {
  //   if (ref.current == null) {
  //     return;
  //   }
  //   const status = await ref.current.getStatusAsync();
  //   if (!status?.isPlaying) {
  //     return;
  //   } else {
  //     try {
  //       await ref.current.stopAsync();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };

  // const unload = async () => {
  //   // console.log("unload");
  //   if (ref.current == null) {
  //     return;
  //   }

  //   try {
  //     await ref.current.unloadAsync();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const loadAsync = async () => {
  //   try {
  //     await ref.current.loadAsync();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   if (props.play) {
  //     loadAsync();
  //   } else {
  //     unload();
  //   }
  // }, [props.play]);

  return (
    <>
      <StatusBar style="light" />
      <Pressable style={styles.container} onPress={() => HandleAudio()}>
        <Video
          style={{ flex: 1 }}
          source={{
            uri: props.url,
          }}
          resizeMode={"cover"}
          onLoad={() => setLoading(false)}
          onLoadStart={() => console.log("Loading started...")}
          onError={(e) => console.log(e)}
          paginEnabled={true}
          shouldPlay={props.play}
          isLooping={true}
          shouldCorrectPitch={true}
        />
      </Pressable>
      {loading ? (
        <View
          style={{
            marginLeft: Dimensions.get("window").width / 2.0,
            position: "absolute",
            top: Dimensions.get("window").height / 2.0 - 70,
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : null}
      {isModalVisible ? (
        <Modal isVisible={isModalVisible}>
          <View style={styles.reportModalContainer}>
            <Text style={styles.reportCategoryTitle}>
              Report this comment for:
            </Text>
            <View style={styles.breakpointStyle} />
            <ScrollView>
              <TouchableOpacity
                style={styles.Category1_Style}
                onPress={() => {
                  setSelectedCategory("Unwanted commercial content or spam");
                  handleReport();
                  handleModalClick();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.Category1_Text_Style}>
                  Unwanted commercial content or spam
                </Text>
              </TouchableOpacity>
              <View style={styles.breakpointStyle} />
              <TouchableOpacity
                style={styles.Category1_Style}
                onPress={() => {
                  setSelectedCategory("Hate speech or graphic violence");
                  handleReport();
                  handleModalClick();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.Category1_Text_Style}>
                  Hate speech or graphic violence
                </Text>
              </TouchableOpacity>
              <View style={styles.breakpointStyle} />
              <TouchableOpacity
                style={styles.Category1_Style}
                onPress={() => {
                  setSelectedCategory("Harassment or bullying");
                  handleReport();
                  handleModalClick();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.Category1_Text_Style}>
                  Harassment or bullying
                </Text>
              </TouchableOpacity>
              <View style={styles.breakpointStyle} />
              <TouchableOpacity
                style={styles.Category1_Style}
                onPress={() => {
                  setSelectedCategory("Child abuse");
                  handleReport();
                  handleModalClick();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.Category1_Text_Style}>Child abuse</Text>
              </TouchableOpacity>
              <View style={styles.breakpointStyle} />
              <TouchableOpacity
                style={styles.Category1_Style}
                onPress={() => {
                  handleModalClick();
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "sans-serif-medium",
                    fontWeight: "bold",
                    color: "skyblue",
                    marginBottom: 10,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      ) : null}
      <View style={styles.like}>
        <Like
          postID={props.postID}
          myUserId={myUserId}
          pressedUserID={clickedUserID}
        />
      </View>
      <TouchableOpacity
        key={props.index}
        style={{
          position: "absolute",
          alignSelf: "center",
          bottom: Dimensions.get("window").height * 0.34,
          right: 25,
        }}
        onPress={() => {
          let postID = props.postID;
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
          source={require("../Images/comment-icon-short-videos.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => actionSheetRef.current?.setModalVisible()}
        style={{
          position: "absolute",
          top: Dimensions.get("window").height * 0.8,
          right: 25,
        }}
      >
        <Image
          style={styles.more}
          source={require("../assets/images/more-icon_for_short_videos.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: "absolute",
          top: Dimensions.get("window").height - 150,
          left: Dimensions.get("window").width * 0.04,
        }}
        onPress={() => userNamePressHandler()}
      >
        <Image
          style={styles.profilePic}
          source={{
            uri: props.profilePicPath,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.userNamePosition}
        onPress={() => userNamePressHandler()}
      >
        <Text style={styles.UserName}>{props.UserName}</Text>
      </TouchableOpacity>
      <Text style={styles.Caption} numberOfLines={1}>
        {props.caption}
      </Text>

      <ActionSheet ref={actionSheetRef} bounceOnOpen={true}>
        <View style={styles.ActionSheetStyle}>
          <View
            style={{
              backgroundColor: "lightgrey",
              height: 5,
              width: "20%",
              position: "absolute",
              top: 10,
              borderRadius: 5,
              marginTop: 5,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.ActionSheetText}>Report</Text>
          </TouchableOpacity>
          <View style={styles.breakpointStyle} />
          <TouchableOpacity
            onPress={() => {
              handleBlock();
            }}
          >
            <Text style={styles.ActionSheetText2}>Block</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </>
  );
};

export default PostSingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  UserName: {
    fontSize: 17,
    color: "#fafafa",
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
  },
  profilePic: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    borderRadius: Dimensions.get("window").width * 0.075,
  },
  Caption: {
    fontSize: 15,
    color: "#fafafa",
    fontFamily: "sans-serif-medium",
    fontWeight: "900",
    position: "absolute",
    marginTop: Dimensions.get("window").height - 100,
    left: 10,
  },
  userNamePosition: {
    position: "absolute",
    top: Dimensions.get("window").height - 140,
    left: Dimensions.get("window").width * 0.18,
  },
  Title: {
    fontSize: 25,
    color: "#fafafa",
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
    position: "absolute",
    top: 20,
    left: 20,
  },
  like: {
    position: "absolute",
    top: Dimensions.get("window").height / 2.2,
    right: 10,
  },
  comment: {
    width: 37,
    height: 37,
  },
  more: {
    alignSelf: "center",
    width: 30,
    height: 30,
  },
  ActionSheetStyle: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 150,
    borderRadius: 20,
  },
  ActionSheetText: {
    fontSize: 15,
    color: "red",
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    marginTop: 40,
  },
  ActionSheetText2: {
    fontSize: 15,
    color: "red",
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    marginTop: 20,
  },
  breakpointStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginTop: 20,
    width: "100%",
  },
  reportModalContainer: {
    backgroundColor: "white",
    width: "90%",
    height: "45%",
    borderRadius: 20,
    alignSelf: "center",
  },
  reportCategoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
    alignSelf: "center",
    marginTop: "5%",
    color: "skyblue",
  },
  Category1_Style: {
    alignSelf: "center",
    marginTop: "5%",
  },
  Category1_Text_Style: {
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    color: "red",
    alignSelf: "center",
  },
  breakpointStyle: {
    backgroundColor: "lightgrey",
    height: 1,
    marginTop: "5%",
  },
});
