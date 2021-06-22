import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import TakePic from "./TakePic";
import { NavigationContainer } from "@react-navigation/native";

export default function AddPost({ navigation }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const PostBtn = () => {
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    return (
      <>
        <View style={styles.container}>
          <TextInput
            style={styles.PostInputStyle}
            placeholder="What's on your mind?"
          />
        </View>

        <ActionButton buttonColor="#7b68ee">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Camera"
            onPress={() => {
              navigation.navigate("TakePic");
            }}
          >
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Choose pictures"
            onPress={() => {
              pickImage();
            }}
          >
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </>
    );
  };

  return (
    <>
      <PostBtn />
      <View style={styles.container}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 300,
              height: 300,
              alignSelf: "center",
              marginTop: 20,
            }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f5f7",
  },
  PostInputStyle: {
    fontSize: 25,
    marginTop: 60,
    fontWeight: "bold",
  },
});