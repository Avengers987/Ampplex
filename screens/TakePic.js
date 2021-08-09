import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FaceDetector from "expo-face-detector";

export default function TakePic({ navigation }) {
  console.log("Hello Cam");
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [flashType, setFlashType] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      console.log("Taking Picture...");
      const getImg = await camera.takePictureAsync();
      setImage(getImg.uri);
      if (image !== null) {
        console.log("image is : ", image);
        navigation.navigate("AddPost", { image: image });
      } else {
        console.log("I am null plz help me! :(");
      }
    }
  };
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return (
      <View>
        <Text>No Access to Camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.CameraStyle}>
      <Camera
        style={styles.FixedAspectRatio}
        onFacesDetected={() => {
          console.log("Face Detected!");
        }}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.none,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
        ref={(ref) => setCamera(ref)}
        type={type}
        zoom
        flashMode={flashType !== null ? flashType : "auto"}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
            style={styles.FlipBtnStyle}
          >
            <MaterialCommunityIcons name="camera-switch" size={30} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.FlashStyle}
          onPress={() => {
            setFlashType(
              flashType === null
                ? "auto"
                : flashType === "auto"
                ? "on"
                : flashType === "on"
                ? "off"
                : "auto"
            );
            console.log(flashType);
          }}
        >
          {flashType === null ? (
            <MaterialCommunityIcons name="flash-auto" size={30} />
          ) : flashType === "on" ? (
            <MaterialCommunityIcons name="flash-outline" size={30} />
          ) : flashType === "off" ? (
            <MaterialCommunityIcons name="flash-off" size={30} />
          ) : (
            <MaterialCommunityIcons name="flash-auto" size={30} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.takePicBtn}
          onPress={() => {
            takePicture();
          }}
        />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Add Style if needed
  },
  CameraStyle: {
    flex: 1,
  },
  FixedAspectRatio: {
    flex: 1,
    aspectRatio: 0.7,
  },
  FlipBtnStyle: {
    alignSelf: "center",
    marginRight: 50,
    marginTop: 50,
  },
  takePicBtn: {
    width: 90,
    height: 90,
    backgroundColor: "#fafafa",
    borderRadius: 100,
    position: "absolute",
    bottom: 25,
    marginLeft: 130,
  },
  FlashStyle: {
    position: "absolute",
    top: 55,
    marginLeft: 80,
  },
});
