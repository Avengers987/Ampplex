import React, { useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = ({ route }) => {
  const userID = route.params.userID;
  const navigation = route.params.navigation;
  const PROFILE_PIC_RADIUS_ANIMATION = 90;
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [myProfilePic, setMyProfilePic] = useState(null);
  const [profilePic, setProfilePicGallery] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const actionSheetRef = createRef();

  const Push_User_Data_To_RealTime_DB = (profilePicPath, userID) => {
    console.warn("User ID is : ", userID);
    firebase
      .database()
      .ref(`User/${userID}/ProfilePicture`)
      .update({
        profilePicPath,
      })
      .then((res) => {
        console.log(`Success: ${res}`);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  const onSubmitHandler_EditProfile = async () => {
    await AsyncStorage.setItem("user_name", firstName + " " + lastName);

    let url = `https://ampplex-backened.herokuapp.com/EditProfile/${userID}/${firstName}/${lastName}/${bio}/`;

    if (lastName == "") {
      url = `https://ampplex-backened.herokuapp.com/EditProfile/${userID}/${firstName}/null/${bio}/`;
    }

    await fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        Alert.alert("Success!", "Edited successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicGallery(result.uri);
      console.log("CACHED FILE REAL LOCATION", result.uri);
      await SetImage(profilePic);
    }
  };

  const getUserInfo = async () => {
    const url = `https://ampplex-backened.herokuapp.com/getUserData/${userID}`;
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFirstName(data.FirstName);
        setLastName(data.LastName);
        setBio(data.Bio);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProfilePicture = async () => {
    const url = `https://ampplex-backened.herokuapp.com/getProfilePicture/${userID}`;
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMyProfilePic(data.profilePic);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SetImage = async (URI) => {
    try {
      let filename = "profilePicture";
      const response = await fetch(URI);
      const blob = await response.blob();

      const childPath = `post/${userID}/${filename}`;
      console.log(`Child Path is : ${childPath}`);

      console.log("firebase!!!!!", URI);

      const task = firebase.storage().ref().child(childPath).put(blob);

      task.on(
        "state_changed",
        (snapshot) => {
          setProfilePicLoading(true);
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            Push_User_Data_To_RealTime_DB(downloadURL, userID);
          });
          Alert.alert("Post status", "Profile picture successfully updated!");
          setProfilePicLoading(false);
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          actionSheetRef.current?.setModalVisible();
        }}
        style={{
          position: "absolute",
          left: 0,
          top: 20,
        }}
      >
        <View
          style={{
            width: 100,
            height: 110,
            borderRadius: 100,
            marginTop: 0,
            marginLeft: 145,
            opacity: 0,
            backgroundColor: "black",
          }}
        ></View>
        {myProfilePic === null ? (
          <Image
            style={{
              width: 90,
              height: 90,
              borderRadius: PROFILE_PIC_RADIUS_ANIMATION,
              position: "absolute",
              left: 150,
              top: 0,
            }}
            source={require("../assets/images/default_profile_picture.png")}
          />
        ) : (
          <Image
            style={{
              width: 90,
              height: 90,
              borderRadius: PROFILE_PIC_RADIUS_ANIMATION,
              position: "absolute",
              left: Dimensions.get("window").width / 2,
              top: 0,
              alignSelf: "center",
            }}
            source={{
              uri: myProfilePic,
            }}
          />
        )}
        {profilePicLoading === true ? (
          <View
            style={{
              marginLeft: 50,
              position: "absolute",
              top: 100,
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View />
        )}
      </TouchableOpacity>

      <View
        style={{
          width: "80%",
          height: 50,
          backgroundColor: "#fff",
          position: "absolute",
          top: 200,
          borderRadius: 28,
          paddingLeft: 20,
          paddingRight: 20,
          borderWidth: 3,
          borderLeftColor: "#FF5190",
          borderTopColor: "#FF5190",
          borderRightColor: "#7B49F6",
          borderBottomColor: "#7B49F6",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 100,
            position: "absolute",
            top: -10,
            left: 50,
          }}
        >
          <Text
            style={{
              color: "grey",
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            First name
          </Text>
        </View>

        <TextInput
          spellCheck={true}
          placeholder={"David"}
          value={firstName}
          maxLength={20}
          onChangeText={(e) => setFirstName(e)}
          style={{
            width: "100%",
            height: "100%",
            color: "black",
            fontSize: 15,
            fontWeight: "bold",
          }}
        />
      </View>

      <View
        style={{
          width: "80%",
          height: 50,
          backgroundColor: "#fff",
          position: "absolute",
          top: 200,
          borderRadius: 28,
          paddingLeft: 20,
          paddingRight: 20,
          borderWidth: 3,
          borderLeftColor: "#FF5190",
          borderTopColor: "#FF5190",
          borderRightColor: "#7B49F6",
          borderBottomColor: "#7B49F6",
          marginTop: 100,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 100,
            position: "absolute",
            top: -10,
            left: 50,
            overflow: "visible",
          }}
        >
          <Text
            style={{
              color: "grey",
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            Last name
          </Text>
        </View>
        <TextInput
          spellCheck={true}
          placeholder={"Ford"}
          maxLength={20}
          value={lastName}
          onChangeText={(e) => setLastName(e)}
          style={{
            width: "100%",
            height: "100%",
            color: "black",
            fontSize: 15,
            fontWeight: "bold",
          }}
        />
      </View>

      <View
        style={{
          width: "80%",
          height: 50,
          backgroundColor: "#fff",
          position: "absolute",
          top: 300,
          borderRadius: 28,
          paddingLeft: 20,
          paddingRight: 20,
          borderWidth: 3,
          borderLeftColor: "#FF5190",
          borderTopColor: "#FF5190",
          borderRightColor: "#7B49F6",
          borderBottomColor: "#7B49F6",
          marginTop: 100,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 50,
            position: "absolute",
            top: -10,
            left: 50,
          }}
        >
          <Text
            style={{
              color: "grey",
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            Bio
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
        >
          <TextInput
            spellCheck={true}
            placeholder={"Type your bio"}
            value={bio}
            maxLength={60}
            onChangeText={(e) => setBio(e)}
            style={{
              width: "100%",
              height: "100%",
              color: "black",
              fontSize: 15,
              fontWeight: "bold",
            }}
          />
        </KeyboardAvoidingView>
      </View>

      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => onSubmitHandler_EditProfile()}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "sans-serif-medium",
            fontWeight: "bold",
            color: "#fff",
            alignSelf: "center",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef} bounceOnOpen={true}>
        <View style={styles.ActionSheetStyle}>
          <View
            style={{
              backgroundColor: "lightgrey",
              width: "15%",
              height: "3.5%",
              borderRadius: 20,
              marginTop: 10,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Edit Profile Picture
          </Text>
          {/* Take Picture from camera */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TakePic", { navParent: "Profile", userID });

              try {
                SetImage(route.params.image);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <View>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  position: "absolute",
                  left: -70,
                  top: 25,
                }}
                source={require("../Images/outline_photo_camera_black_24dp.png")}
              />
              <Text
                style={{
                  marginTop: 28,
                  fontSize: 18,
                }}
              >
                Take Picture
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickImage()}>
            <View>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  position: "absolute",
                  left: -60,
                  top: 38,
                }}
                source={require("../Images/gallery.png")}
              />
              <Text
                style={{
                  marginTop: 38,
                  fontSize: 18,
                  alignItems: "center",
                }}
              >
                Choose Picture
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  ActionSheetStyle: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 200,
  },
  submitBtn: {
    backgroundColor: "#9328FF",
    width: "40%",
    height: "7%",
    borderRadius: 15,
    paddingTop: 5,
    position: "absolute",
    top: 500,
    elevation: 12,
  },
});
