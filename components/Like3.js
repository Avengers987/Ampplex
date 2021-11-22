import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const Like = (props) => {
  const [liked, setLiked] = useState(null);
  const animation = useRef(null);
  const isFirstRun = useRef(true);
  const [lastTap, setLastTap] = useState(null);
  const DOUBLE_PRESS_DELAY = 300;
  const [likesCount, setLikesCount] = useState(null);

  const handledDoubleTap = () => {
    if (lastTap && Date.now() - lastTap < DOUBLE_PRESS_DELAY) {
      if (liked) {
        setLiked(true);
        animation.current.play(25, 50);
      } else {
        setLiked(true);
        setLikesCount(likesCount + 1);
        Increament_Likes();
      }
    } else {
      setLastTap(Date.now());
    }
  };

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
      animation.current.play(0, 20);
    }
  }, [liked]);

  const CheckLiked = () => {
    const url = `https://ampplex-backened.herokuapp.com/isLiked/${props.myUserId}/${props.postID}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.likedPosts === true) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Increament_Likes = () => {
    const url = `https://ampplex-backened.herokuapp.com/UpdateLikes/${props.myUserId}/${props.postID}/${props.pressedUserID}/Like`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLiked(true);
        GetLikes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Decreament_Likes = () => {
    const url = `https://ampplex-backened.herokuapp.com/UpdateLikes/${props.myUserId}/${props.postID}/${props.pressedUserID}/Dislike`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLiked(false);
        GetLikes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetLikes = () => {
    const url = `https://ampplex-backened.herokuapp.com/GetLikes/${props.pressedUserID}/${props.postID}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLikesCount(data.Likes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetLikes();
    CheckLiked();
  }, []);

  const likePost = () => {
    return (
      <View>
        <LottieView
          style={styles.DoubleTapLike}
          source={require("../assets/lottie/like.json")}
          autoPlay
          loop={false}
        />
      </View>
    );
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          handledDoubleTap();
        }}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          position: "absolute",
          borderRadius: 20,
          opacity: 0,
          left: -279,
          backgroundColor: "#fafa",
          bottom: -280,
          alignItems: "center",
        }}
      />

      <Pressable
        onPress={() => {
          if (liked) {
            setLiked(false);
            console.log(liked);
            if (likesCount - 1 > -1) {
              setLikesCount(likesCount - 1);
            }
            Decreament_Likes();
          } else {
            setLiked(true);
            console.log(liked);
            Increament_Likes();
          }
        }}
      >
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
          top: 63,
          left: 30,
          color: "#fff",
          fontWeight: "bold",
          fontFamily: "sans-serif-medium",
          fontSize: 13,
        }}
      >
        {likesCount} likes
      </Text>
    </View>
  );
};

export default Like;

const styles = StyleSheet.create({
  heartLottie: {
    width: 80,
    height: 80,
    marginLeft: 5,
    marginTop: 0,
  },
  DoubleTapLike: {
    width: 300,
    height: 300,
    position: "absolute",
    top: -200,
    alignSelf: "center",
  },
});
