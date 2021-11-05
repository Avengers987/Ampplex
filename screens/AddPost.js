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
  ActivityIndicator,
  Alert,
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase";

const Push_User_Data_To_RealTime_DB = (
  imgPath,
  caption,
  timestamp,
  userID,
  type
) => {
  const Likes = 0; // Initial likes are 0

  firebase
    .database()
    .ref(`User/${userID}/Post/`)
    .push({
      imgPath,
      caption,
      timestamp,
      type,
      Likes,
    })
    .then((res) => {
      console.log(`Success: ${res}`);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

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

export default function AddPost({ navigation, route, userID }) {
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [postTxt, setPostTxt] = useState(null);
  const [posted, setPosted] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState(false); // if true then user have not attached picture or video or not written caption
  const [clickedPost, setClickedPost] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [autoFocus, setAutoFocus] = useState(true);

  if (userID === undefined) {
    userID = route.params.userID;
  }

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

  const sendPostToCloudServer = async () => {
    console.log("Posting...");
    setPosted(false);
    SetImage();
    if (image !== null) {
      setClickedPost(true);
      const URI = image;
      let filename = URI.substring(URI.lastIndexOf("/") + 1);
      const response = await fetch(URI);
      const blob = await response.blob();

      const childPath = `post/${userID}/${filename}`;
      console.log(`Child Path is : ${childPath}`);

      console.log("firebase!!!!!", URI);

      try {
        const uploadUri =
          Platform.OS === "ios" ? uri.replace("file://", "") : URI;
        const task = firebase.storage().ref().child(childPath).put(blob);

        task.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setUploadStatus(progress.toFixed(2) + "%");
            setAutoFocus(false);
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            ErrorFlasher("Some error occured! :(");
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at", downloadURL);
              Push_User_Data_To_RealTime_DB(
                downloadURL,
                postTxt,
                new Date().toLocaleTimeString() +
                  " | " +
                  new Date().toDateString(),
                userID,
                mediaType
              );
            });

            Alert.alert("Post status", "Successfully posted!");
            setPosted(true);
            setImage(null);
            setPostTxt(null);
            setAutoFocus(true);
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else if (image === null || postTxt === "" || postTxt === null) {
      ErrorFlasher("Please type caption or attach media to your post");
      setError(true);
    } else {
      console.log(postTxt);
    }
  };

  const PostBtn = () => {
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
        setMediaType("Image");
      }
    };

    const pickVideo = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        aspect: [1, 1],
        quality: 1,
        allowsMultipleSelection: false,
        videoQuality: 7,
      });

      console.log(result);

      if (!result.cancelled) {
        if (result.uri.substring(result.uri.lastIndexOf(".")) != ".mp4") {
          console.log("Please select a video");
        }
        setImage(result.uri);
        setMediaType("Video");
      }
    };

    return (
      <>
        <StatusBar style="light" />
        <View style={styles.container}>
          <TextInput
            style={styles.PostInputStyle}
            placeholder="What's on your mind?"
            maxLength={100}
            value={postTxt}
            autoFocus={autoFocus}
            onChangeText={(e) => {
              setPostTxt(e);
            }}
          />
        </View>
        {/* Add post button */}
        {/* Includes 
        1. Upload picture from camera
        2. Upload Picture from gallery
        3. Upload video from camera
         */}
        <ActionButton buttonColor="#7b68ee">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Camera"
            onPress={() => {
              navigation.navigate("TakePic", { navParent: "AddPost", userID });
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
          <ActionButton.Item
            buttonColor="#3498db"
            title="Choose Video"
            onPress={() => {
              pickVideo();
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
            source={{ uri: image }}
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
        {posted === false && error === false ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            ></Text>
            <ActivityIndicator size="large" color="skyblue" />
          </View>
        ) : (
          <View />
        )}
        {clickedPost === true ? (
          <View>
            <Text
              style={{
                fontSize: 17,
              }}
            >
              Uploaded : {uploadStatus}
            </Text>
          </View>
        ) : (
          <View />
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
