import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const PostSingle = forwardRef((props, parentRef) => {
  const ref = useRef(null);

  useImperativeHandle(parentRef, () => ({
    play,
    stop,
    unload,
  }));

  useEffect(() => {
    return () => unload();
  }, []);

  const play = async () => {
    if (ref.current == null) {
      return;
    }
    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    } else {
      try {
        ref.current.playAsync();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const stop = async () => {
    if (ref.current == null) {
      return;
    }
    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    } else {
      try {
        await ref.current.stopAsync();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const unload = async () => {
    console.log("unload");
    if (ref.current == null) {
      return;
    }

    try {
      await ref.current.unloadAsync();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        style={{ flex: 1 }}
        ref={ref}
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        resizeMode={Video.RESIZE_MODE_COVER}
        shouldPlay={true}
        onLoad={() => console.log("Loading...")}
        onError={(e) => console.log(e)}
        paginEnabled
        decelerationRate={"normal"}
      />
    </View>
  );
});

export default PostSingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
