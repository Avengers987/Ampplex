import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  ImageEditor,
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
// import storage from "@react-native-firebase/storage";
// import firebase from "react-native-firebase";
// import * as firebase from "firebase";
import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyB_vMbdEOmrMH_Eo4IuNkuObyY_ACLI5-k",
//   authDomain: "ampplex-75da7.firebaseapp.com",
//   databaseURL: "https://ampplex-75da7-default-rtdb.firebaseio.com",
//   projectId: "ampplex-75da7",
//   storageBucket: "ampplex-75da7.appspot.com",
//   messagingSenderId: "730587965700",
//   appId: "1:730587965700:web:7c71f40fd541c7b91bc851",
//   measurementId: "G-BSPPZFVTMS",
// };

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }

const getWindowDimensionsWidth = () => {
  const dimensions = Dimensions.get("window").width;
  return dimensions;
};
const getWindowDimensionsHeight = () => {
  const dimensions = Dimensions.get("window").height;
  return dimensions;
};

require("firebase/firestore");
require("firebase/firebase-storage");

export default function AddPost({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [postTxt, setPostTxt] = useState(null);
  const [camImg, setCamImg] = useState(null);

  console.log(`route: ${route.params}}`);

  const SetImage = () => {
    try {
      setImage(route.params.image);
    } catch {
      console.log("No image selected!");
    }
  };
  const ErrorFlasher = (msg) => {
    showMessage({
      message: `Error: ${msg}`,
      type: "danger",
    });
  };

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

  async function getData() {
    try {
      const userName = await AsyncStorage.getItem("user_name");
      const user_id = await AsyncStorage.getItem("user_id");
      setUserId(user_id);
    } catch (e) {
      // error reading value
      ErrorFlasher("Failed to retrieve your login info!");
    }
  }

  const sendPostToCloudServer = async () => {
    console.log("Posting...");
    SetImage();
    if (image !== null) {
      const URI = image;
      const response = await fetch(URI);
      const blob = response.blob();
      const childPath = `post/${userId}/${Math.random().toString(36)}`;
      console.log(`Child Path is : ${childPath}`);

      let filename = URI.substring(URI.lastIndexOf("/") + 1);
      console.log("firebase!!!!!", URI);
      try {
        const uploadUri =
          Platform.OS === "ios" ? uri.replace("file://", "") : URI;
        const task = firebase.storage().ref().child(childPath).put(blob);
      } catch (e) {
        console.log(e);
      }
    } else if ((image === null && postTxt === "") || postTxt === null) {
      ErrorFlasher("Please type or attach your post");
    } else {
      console.log(postTxt);
    }
  };

  const PostBtn = () => {
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,

        allowsEditing: true,
        aspect: [5, 4],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    return (
      <>
        <StatusBar style="light" />
        <View style={styles.container}>
          <TextInput
            style={styles.PostInputStyle}
            placeholder="What's on your mind?"
            type="email"
            value={postTxt}
            autoFocus
            onChangeText={(e) => setPostTxt(e)}
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
        <FlashMessage position="bottom" />
      </>
    );
  };

  return (
    <>
      <PostBtn />
      <View style={styles.container}>
        {image && (
          <Image
            source={{ uri: image === null ? camImg : image }}
            style={{
              width: getWindowDimensionsWidth(),
              height: getWindowDimensionsWidth(),
              alignSelf: "center",
              marginTop: 20,
            }}
          />
        )}
        <View>
          <TouchableOpacity
            style={styles.postBtnStyle}
            onPress={sendPostToCloudServer}
          >
            <Text style={styles.postBtnTextStyle}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  PostInputStyle: {
    fontSize: 25,
    marginTop: 60,
    fontWeight: "800",
  },
  postBtnStyle: {
    backgroundColor: "skyblue",
    width: 100,
    height: 30,
    marginTop: 20,
    borderRadius: 50,
  },
  postBtnTextStyle: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 16.5,
  },
});
