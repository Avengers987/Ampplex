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
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
// import Video from "react-native-video";

const PostSingle = (props, { navigation, myUserId }) => {
  const [play, setPlay] = useState(props.play);
  const userId = props.userId;
  const clickedUserName = props.UserName;

  // console.log("Play or not?", props.play, props.currentIndex, props.index);

  const HandlePlay = () => {
    if (props.play) {
      setPlay(!play);
    }
  };

  const userNamePressHandler = () => {
    // console.log(navigation);
    // navigation.navigate("UserProfile", {
    //   userId,
    //   clickedUserName,
    //   myUserId,
    // });
  };

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
  //   console.log("unload");
  //   if (ref.current == null) {
  //     return;
  //   }

  //   try {
  //     await ref.current.unloadAsync();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   if (props.play) {
  //     playVideo();
  //   } else {
  //     // stop();
  //     // unload();
  //   }
  // }, [props.play]);

  return (
    <>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => HandlePlay()}
      >
        <Video
          style={{ flex: 1 }}
          source={{
            uri: props.url,
          }}
          resizeMode={"cover"}
          shouldPlay={props.play}
          onLoad={() => console.log("Loading...")}
          onLoadStart={() => console.log("Load start...")}
          onError={(e) => console.log(e)}
          paginEnabled={true}
          isLooping={true}
          shouldCorrectPitch={true}
          isMuted={false}
        />
      </TouchableWithoutFeedback>
      <Image
        style={styles.profilePic}
        source={{
          uri: props.profilePicPath,
        }}
      />
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
    width: Dimensions.get("window").width * 0.12,
    height: Dimensions.get("window").width * 0.12,
    borderRadius: Dimensions.get("window").width * 0.075,
    position: "absolute",
    top: Dimensions.get("window").height * 0.735,
    left: Dimensions.get("window").width * 0.02,
  },
  Caption: {
    fontSize: 15,
    color: "#fafafa",
    fontFamily: "sans-serif-medium",
    position: "absolute",
    marginTop: Dimensions.get("window").height * 0.82,
    left: 10,
  },
  userNamePosition: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.75,
    left: Dimensions.get("window").width * 0.2,
  },
});
