import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function TakePic() {
  console.log("Hello Cam");
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      console.log("Entered!");
      const getImg = await camera.takePictureAsync(null);
      console.log("img: ", getImg.uri);
      setImage(getImg.uri);
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
        ref={(ref) => setCamera(ref)}
        type={type}
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
            <MaterialCommunityIcons name="flip-horizontal" size={40} />
          </TouchableOpacity>
        </View>
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
    width: 100,
    height: 100,
    backgroundColor: "#fafafa",
    borderRadius: 100,
    position: "absolute",
    bottom: 25,
    marginLeft: 130,
  },
});
