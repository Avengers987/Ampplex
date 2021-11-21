import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
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
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { StatusBar } from "expo-status-bar";
import Like from "../components/Like3";

const PostSingle = (props) => {
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const clickedUserID = props.userId;
  const clickedUserName = props.UserName;
  const navigation = props.navigation;
  const myUserId = props.myUserId;

  const HandleAudio = () => {
    console.log("Audio controller triggered!");
    setPlay(!play);
  };

  console.log(props.index, props.currentIndex);

  const userNamePressHandler = () => {
    navigation.navigate("UserProfile", {
      clickedUserID,
      clickedUserName,
      myUserId,
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
});
