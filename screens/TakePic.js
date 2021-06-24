import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function TakePic() {
  console.log("Hello Cam");
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Camera.takePictureAsync();

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
    <View style={styles.container}>
      <Camera style={styles.CameraStyle} type={type}>
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
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f5f7",
  },
  CameraStyle: {
    width: 400,
    height: 800,
    alignSelf: "center",
  },
  FlipBtnStyle: {
    alignSelf: "center",
    marginTop: 50,
  },
});
