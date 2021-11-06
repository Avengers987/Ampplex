import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const PostSingle = (props) => {
  const [play, setPlay] = useState(true);

  const HandlePlay = () => {
    setPlay(!play);
  };

  // const ref = useRef(null);

  // const play = async () => {
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

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => HandlePlay()}
    >
      <Video
        style={{ flex: 1 }}
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        resizeMode={"cover"}
        shouldPlay={play}
        onLoad={() => console.log("Loading...")}
        onError={(e) => console.log(e)}
        paginEnabled={true}
        isLooping={true}
      />
    </TouchableWithoutFeedback>
  );
};

export default PostSingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
