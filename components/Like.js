import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const Like = (props) => {
  const [liked, setLiked] = useState(false);
  const [isliked, setisLiked] = useState(false);
  const animation = useRef(null);
  const isFirstRun = useRef(true);
  const [lastTap, setLastTap] = useState(null);
  const DOUBLE_PRESS_DELAY = 300;
  const [doubleTapLike, setDoubleTapLike] = useState(false);

  const handledDoubleTap = () => {
    if (lastTap && Date.now() - lastTap < DOUBLE_PRESS_DELAY) {
      isliked ? setLiked(false) : setLiked(true);
      setTimeout(() => {
        setDoubleTapLike(true);
      }, 3000);
      setDoubleTapLike(false);
    } else {
      setLastTap(Date.now());
    }
  };

  console.log(props.postID);

  React.useEffect(() => {
    if (isFirstRun.current) {
      if (liked) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (liked) {
      animation.current.play(20, 50);
    } else {
      animation.current.play(0, 19);
    }
  }, [liked]);

  return (
    <View>
      <Pressable
        onPress={() => handledDoubleTap()}
        style={{
          width: Dimensions.get("window").width - 20,
          height: Dimensions.get("window").height / 1.5,
          position: "absolute",
          top: -517,
          borderRadius: 20,
          opacity: 0,
        }}
      />
      {doubleTapLike ? (
        <LottieView
          style={styles.DoubleTapLike}
          source={require("../assets/lottie/like.json")}
          autoPlay={true}
          loop={false}
        />
      ) : (
        <View />
      )}
      <Pressable onPress={() => setLiked((liked) => !liked)}>
        {/* <MaterialCommunityIcons
          name={liked ? "heart" : "heart-outline"}
          size={32}
          style={styles.heartLottie}
          color={liked ? "red" : "black"}
        /> */}
        <LottieView
          style={styles.heartLottie}
          source={require("../assets/lottie/like.json")}
          autoPlay={true}
          ref={animation}
          loop={false}
        />
      </Pressable>
      <Text
        style={{
          position: "absolute",
          top: 50,
          left: 20,
        }}
      >
        0 likes
      </Text>
    </View>
  );
};

export default Like;

const styles = StyleSheet.create({
  heartLottie: {
    width: 65,
    height: 65,
    marginLeft: 5,
    marginTop: 0,
  },
  DoubleTapLike: {
    width: 250,
    height: 250,
    position: "absolute",
    top: -200,
    alignSelf: "center",
  },
});
