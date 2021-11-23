import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const Like = (props) => {
  const [liked, setLiked] = useState(null);
  const animation = useRef(null);
  const isFirstRun = useRef(true);
  const [lastTap, setLastTap] = useState(null);
  const [likesCount, setLikesCount] = useState(null);

  class LikeController {
    constructor() {
      this.checkLiked_Url = `https://ampplex-backened.herokuapp.com/isLiked/${props.myUserId}/${props.postID}`;

      this.Increament_Likes_URL = `https://ampplex-backened.herokuapp.com/UpdateLikes/${props.myUserId}/${props.postID}/${props.pressedUserID}/Like`;

      this.Decreament_Likes_URL = `https://ampplex-backened.herokuapp.com/UpdateLikes/${props.myUserId}/${props.postID}/${props.pressedUserID}/Dislike`;

      this.GetLikes_URL = `https://ampplex-backened.herokuapp.com/GetLikes/${props.pressedUserID}/${props.postID}`;

      this.DOUBLE_PRESS_DELAY = 300;
    }

    CheckLiked() {
      fetch(this.checkLiked_Url)
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
    }

    Increament_Likes() {
      fetch(this.Increament_Likes_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLiked(true);
          this.GetLikes();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    Decreament_Likes() {
      fetch(this.Decreament_Likes_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLiked(false);
          this.GetLikes();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    GetLikes() {
      fetch(this.GetLikes_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLikesCount(data.Likes);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    handledDoubleTap() {
      if (lastTap && Date.now() - lastTap < this.DOUBLE_PRESS_DELAY) {
        if (liked) {
          setLiked(true);
          animation.current.play(25, 50);
        } else {
          setLiked(true);
          setLikesCount(likesCount + 1);
          this.Increament_Likes();
        }
      } else {
        setLastTap(Date.now());
      }
    }
  }

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

  const controller = new LikeController();

  useEffect(() => {
    controller.GetLikes();
    controller.CheckLiked();
  }, []);

  return (
    <View>
      <Pressable
        onPress={() => {
          controller.handledDoubleTap();
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
            controller.Decreament_Likes();
          } else {
            setLiked(true);
            console.log(liked);
            controller.Increament_Likes();
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
