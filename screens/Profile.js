import React, { useState, createRef, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import { Video, AVPlaybackStatus } from "expo-av";

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

const Profile = ({ userName, userID, navigation, route }) => {
  const [posts, SetPosts] = useState(0);
  const [response, setResponse] = useState([]);
  const [profilePic, setProfilePicGallery] = useState(null);
  const [myProfilePic, setMyProfilePic] = useState(null);
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [follower, setFollower] = useState(0);
  const [loading, setLoading] = useState(true);

  if (userID == undefined) {
    userID = route.params.userID;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfilePicGallery(result.uri);
      await SetImage(profilePic);
    }
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
        console.log("");
      });
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

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

  const getPost = async () => {
    const url = `https://ampplex-backened.herokuapp.com/Count_Posts/${userID}`;
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        SetPosts(data.Posts);
      })
      .catch((err) => {
        console.log(e);
      });
  };

  const getMyPosts = async () => {
    const url = `https://ampplex-backened.herokuapp.com/getMyPosts/${userID}`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("");
      });
  };

  const getFollowers = async () => {
    const url = `http://ampplex-backened.herokuapp.com/GetFollower/${userID}/`;
    console.log(url, "See me!");
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setFollower(data.Followers);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFollowers();
    getPost();
    getMyPosts();
  }, []);

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
                myProfilePic != null
                  ? myProfilePic
                  : "https://images.unsplash.com/photo-1514923995763-768e52f5af87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            }}
          />
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
          <Text style={styles.Followers}>{follower}</Text>
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
        {loading ? (
          <View
            style={{
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            <ActivityIndicator size="large" color="skyblue" />
          </View>
        ) : (
          response.map((element, index) => {
            return (
              <View style={styles.postView} key={index}>
                <View>
                  {/*Profile Picture*/}
                  <Image
                    style={styles.profilePicture}
                    source={{
                      uri: myProfilePic,
                    }}
                  />
                </View>
                <View style={styles.UserNameContainer}>
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: "bold",
                    }}
                  >
                    {userName}
                  </Text>
                </View>
                {element.Type == "Image" ? (
                  <Image
                    source={{
                      uri: element["ImgPath"],
                    }}
                    style={styles.postImg}
                  />
                ) : (
                  <Video
                    ref={video}
                    style={styles.video}
                    source={{
                      uri: element.ImgPath,
                    }}
                    useNativeControls
                    resizeMode="cover"
                    isLooping
                    onMoveShouldSetResponder={() => console.log("Touched!")}
                    onLoadStart={() => console.log("Loading...")}
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                  />
                )}
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
          })
        )}
        <View
          style={{
            height: 55,
          }}
        />
      </ScrollView>
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
                console.log("Picture from cam is not selected");
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
    elevation: 12,
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
    height: 450,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 20,
  },
  postView: {
    width: 400,
    height: 600,
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
  video: {
    alignSelf: "center",
    width: 365,
    height: 490,
    borderRadius: 15,
  },
  profilePicture: {
    width: 43,
    height: 43,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 15,
  },
  UserNameContainer: {
    marginLeft: 80,
    position: "absolute",
    top: 20,
  },
});
