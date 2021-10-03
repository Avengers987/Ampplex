import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const Like = (props) => {
  const [liked, setLiked] = useState(null);
  const animation = useRef(null);
  const DoubleTapanimation = useRef(null);
  const isFirstRun = useRef(true);
  const [lastTap, setLastTap] = useState(null);
  const DOUBLE_PRESS_DELAY = 300;
  const [doubleTapLike, setDoubleTapLike] = useState(false);
  const [likesCount, setLikesCount] = useState(null);
  const [disbleCheckLiked, setDisbleCheckLiked] = useState(false);
  let checkLikedCounter = 0;
  let checkGetLikesCounter = 0;

  const handledDoubleTap = () => {
    if (lastTap && Date.now() - lastTap < DOUBLE_PRESS_DELAY) {
      if (liked) {
        setDisbleCheckLiked(true);
        setLiked(false);
        console.log(liked);
        setLikesCount(likesCount - 1);
        Decreament_Likes();
      } else {
        setDisbleCheckLiked(true);
        setLiked(true);
        console.log(liked);
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

  // React.useEffect(() => {
  //   if (liked) {
  //     setDoubleTapLike(true);
  //     animation.current.play(20, 50);
  //   } else {
  //     setDoubleTapLike(false);
  //     animation.current.play(0, 20);
  //   }
  // }, [liked]);

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
    checkLikedCounter += 1;
  };

  const Increament_Likes = () => {
    const url = `https://ampplex-backened.herokuapp.com/UpdateLikes/${props.myUserId}/${props.postID}/${props.pressedUserID}/Like`;
    console.log("[Increamenting Likes]");
    console.log(url);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLiked(true);
        console.log("Inc: ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Decreament_Likes = () => {
    const url = `https://ampplex-backened.herokuapp.com/UpdateLikes/${props.myUserId}/${props.postID}/${props.pressedUserID}/Dislike`;
    console.log("[Decreamenting Likes]");
    console.log(url);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLiked(false);
        console.log("Dec: ", data);
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
    checkGetLikesCounter += 1;
  };

  console.log(disbleCheckLiked);

  if (disbleCheckLiked === false) {
    GetLikes();
  }

  if (disbleCheckLiked === false) {
    CheckLiked();
  }

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
          width: Dimensions.get("window").width - 20,
          height: Dimensions.get("window").height / 1.5,
          position: "absolute",
          top: -517,
          borderRadius: 20,
          opacity: 0,
        }}
      />
      {/* {doubleTapLike ? likePost() : <View />} */}
      <Pressable
        onPress={() => {
          if (liked) {
            console.log(liked, "Already Likes");
            setDisbleCheckLiked(true);
            setLiked(false);
            console.log(liked);
            setLikesCount(likesCount - 1);
            Decreament_Likes();
          } else {
            console.log(liked, "Liking for the first time");
            setDisbleCheckLiked(true);
            setLiked(true);
            console.log(liked);
            setLikesCount(likesCount + 1);
            Increament_Likes();
          }
        }}
      >
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
