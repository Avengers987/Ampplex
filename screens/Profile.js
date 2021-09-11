import React, { useState, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";

const actionSheetRef = createRef();

const Push_User_Data_To_RealTime_DB = (profilePicPath, userID) => {
  console.warn("User ID is : ", userID);
  firebase
    .database()
    .ref(`User/${userID}/`)
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

const Profile = ({ userName, userID, navigation, route }) => {
  const [posts, SetPosts] = useState(0);
  const [response, setResponse] = useState([]);
  const [profilePic, setProfilePicGallery] = useState(null);
  let actionSheet;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      allowsEditing: true,
      aspect: [5, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfilePicGallery(result.uri);
    }
    try {
      SetImage(profilePic);
    } catch (e) {
      console.log("Picture from gallery is not selected");
    }
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
          Alert.alert("Post status", "Image Uploaded!");
        }
      );
    } catch (e) {
      console.log("");
    }
  };

  try {
    SetImage(route.params.image);
  } catch (e) {
    console.log("Picture from cam is not selected");
  }

  const getPost = () => {
    const url = `https://ampplex-backened.herokuapp.com/Count_Posts/${userID}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        SetPosts(data.Posts);
      })
      .catch((err) => {
        console.log("");
      });
  };

  const getMyPosts = async () => {
    const url = `https://ampplex-backened.herokuapp.com/getMyPosts/${userID}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data);
      })
      .catch((e) => {
        console.log("");
      });
  };

  getPost();
  getMyPosts();

  return (
    <>
      <View style={styles.Profile}>
        <Text style={styles.UserName}>{userName}</Text>
        <TouchableOpacity
          onPress={() => actionSheetRef.current?.setModalVisible()}
          style={{
            position: "absolute",
            left: 0,
            top: 20,
          }}
        >
          <View
            style={{
              width: 100,
              height: 90,
              borderRadius: 100,
              marginTop: 70,
              opacity: 0,
            }}
          ></View>

          <Image
            style={styles.Profile_Picture}
            source={{
              uri:
                profilePic === null
                  ? "https://source.unsplash.com/random/200x200?sig=incrementingIdentifier"
                  : profilePic,
            }}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.PostsNumber}>{posts}</Text>
          <Text
            style={{
              position: "absolute",
              top: 70,
              fontSize: 15,
              left: -36,
            }}
          >
            Posts
          </Text>
        </View>
        <View>
          <Text style={styles.Followers}>67</Text>
          <Text
            style={{
              position: "absolute",
              top: 70,
              fontSize: 15,
              alignSelf: "center",
              left: 50,
            }}
          >
            Followers
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              position: "absolute",
              top: 200,
              alignSelf: "center",
            }}
          >
            My Posts
          </Text>
        </View>
      </View>
      <ScrollView
        style={{
          marginTop: 10,
        }}
      >
        {response.map((element) => {
          return (
            <View style={styles.postView}>
              <View>
                {/*Profile Picture*/}
                <Image
                  style={styles.profilePicture}
                  source={{
                    uri: "https://source.unsplash.com/random/200x200?sig=incrementingIdentifier",
                  }}
                />
              </View>
              <View style={styles.UserNameContainer}>
                <Text style={styles.UserName}>{element["UserName"]}</Text>
              </View>
              <Image
                source={{
                  uri: element["ImgPath"],
                }}
                style={styles.postImg}
              />
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    alignSelf: "flex-start",
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                >
                  {element["Caption"]}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <ActionSheet ref={actionSheetRef} bounceOnOpen={true}>
        <View style={styles.ActionSheetStyle}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Edit Profile Picture
          </Text>
          {/* Take Picture from camera */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TakePic", { navParent: "Profile" })
            }
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
                }}
              >
                Choose Picture
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 300,
    borderRadius: 50,
  },
  Profile2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  UserName: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: -225,
  },
  Profile_Picture: {
    width: 90,
    height: 90,
    borderRadius: 100,
    position: "absolute",
    left: 20,
    top: 70,
  },
  PostsNumber: {
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    top: 30,
    left: -25,
  },
  Followers: {
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    left: 70,
    top: 30,
  },
  postImg: {
    width: 350,
    height: 350,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 20,
  },
  postView: {
    width: 400,
    height: 460,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 30,
  },
  ActionSheetStyle: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 200,
  },
});
