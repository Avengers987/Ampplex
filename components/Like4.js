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
        setLiked(false);
        //(liked);
        setLikesCount(likesCount - 1);
        Decreament_Likes();
      } else {
        setLiked(true);
        //(liked);
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
        //(error);
      });
  };

  const Increament_Likes = () => {
    const url = `https://ampplex-backened.herokuapp.com/UpdateLikes/${props.myUserId}/${props.postID}/${props.pressedUserID}/Like`;
    //("[Increamenting Likes]");
    //(url);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLiked(true);
        //("Inc: ", data);
      })
      .catch((error) => {
        //(error);
      });
  };

  const Decreament_Likes = () => {
    const url = `https://ampplex-backened.herokuapp.com/UpdateLikes/${props.myUserId}/${props.postID}/${props.pressedUserID}/Dislike`;
    //("[Decreamenting Likes]");
    //(url);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLiked(false);
        //("Dec: ", data);
      })
      .catch((error) => {
        //(error);
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
        //(error);
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
          if (liked) {
            //(liked, "Already Likes");
            setLiked(false);
            //(liked);
            setLikesCount(likesCount - 1);
            Decreament_Likes();
          } else {
            //(liked, "Liking for the first time");
            setLiked(true);
            //(liked);
            setLikesCount(likesCount + 1);
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
          top: 50,
          left: 20,
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
