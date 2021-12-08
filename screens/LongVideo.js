import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { Video } from "expo-av";

const LongVideo = ({ imgPath }) => {
  const [Muted, setIsMuted] = useState(true);

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {}}
        style={styles.videoContainer}
      >
        <Video
          style={styles.video}
          source={{
            uri: imgPath,
          }}
          resizeMode={"contain"}
          onLoadStart={() => {
            console.log("onLoadStart");
          }}
          onLoad={() => {
            console.log("onLoad");
          }}
          isLooping={true}
          paginEnabled={true}
          shouldPlay={true}
          isMuted={Muted}
        />
      </TouchableWithoutFeedback>
      <Pressable
        style={{
          alignSelf: "center",
          position: "absolute",
          top: Dimensions.get("window").height / 13,
          left: Dimensions.get("window").width / 1.2,
        }}
        onPress={() => setIsMuted(!Muted)}
      >
        {Muted == false ? (
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require("../assets/images/speaker-icon.png")}
          />
        ) : (
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require("../assets/images/mute-icon.png")}
          />
        )}
      </Pressable>
    </View>
  );
};

export default LongVideo;

const styles = StyleSheet.create({
  videoContainer: {
    width: 400,
    height: 300,
    borderRadius: 20,
  },
  video: {
    width: 400,
    height: 300,
    borderRadius: 15,
  },
});
