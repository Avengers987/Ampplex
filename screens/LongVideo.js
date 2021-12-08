import React, { useState, useRef, createRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import ActionSheet from "react-native-actions-sheet";
import { useDeviceOrientation } from "@react-native-community/hooks";

const LongVideo = ({ imgPath, caption }) => {
  const [Muted, setIsMuted] = useState(true);
  const actionSheetRef = createRef();
  const orientation = useDeviceOrientation().portrait
    ? "portrait"
    : "landscape";
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const testing_video =
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4";

  return (
    <View>
      <StatusBar style="light" />
      <TouchableWithoutFeedback
        onPress={() => {
          actionSheetRef.current?.setModalVisible();
        }}
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
            setLoading1(false);
          }}
          isLooping={true}
          paginEnabled={true}
          shouldPlay={true}
          isMuted={Muted}
        />
      </TouchableWithoutFeedback>
      {loading1 ? (
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            top: 90,
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : null}
      <Pressable
        style={{
          alignSelf: "center",
          position: "absolute",
          top: Dimensions.get("window").height / 20,
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
      <ActionSheet ref={actionSheetRef} bounceOnOpen={false}>
        <View style={styles.ActionSheetStyle}>
          <Video
            useNativeControls={true}
            style={{
              width:
                orientation == "portrait"
                  ? 400
                  : Dimensions.get("window").width,
              height:
                orientation == "portrait"
                  ? 300
                  : Dimensions.get("window").height,
              position: "absolute",
              backgroundColor: "black",
              top:
                orientation == "portrait"
                  ? -Dimensions.get("window").height / 11.7
                  : -Dimensions.get("window").height / 14,
            }}
            source={{
              uri: imgPath,
            }}
            resizeMode={"cover"}
            onLoadStart={() => {
              console.log("onLoadStart");
            }}
            onLoad={() => {
              console.log("onLoad");
              setLoading2(false);
            }}
            isLooping={true}
            paginEnabled={true}
            shouldPlay={true}
            isMuted={Muted}
          />
          {loading2 ? (
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                top: Dimensions.get("window").height / 10,
              }}
            >
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : null}
          {orientation == "portrait" ? (
            <View style={styles.BottomComponentStyle}>
              <View style={styles.caption}>
                <Text style={styles.text}>{caption}</Text>
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
      </ActionSheet>
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
    height: 228,
    backgroundColor: "black",
  },
  ActionSheetStyle: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  caption: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    left: 10,
  },
  text: {
    fontSize: 17,
    fontFamily: "sans-serif-medium",
  },
  BottomComponentStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.3,
    position: "absolute",
    top: Dimensions.get("window").height / 3.3,
  },
});
