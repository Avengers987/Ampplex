import React, { useState, createRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import EditProfile from "../components/EditProfile";
import Like4 from "../components/Like4";
import Like2 from "../components/Like2";
import More from "../components/More";
import LongVideo from "./LongVideo";

interface Push_User_Data_To_RealTime_DB {
  (profilePicPath: string, userID: string)
}

interface Profile_Props {
  userID: string;
  navigation: any;
  route: any;
}

interface IState {
  UserData: {
    Type: string;
    ImgPath: string;
    Post_ID: string;
    Caption: string;
    Timestamp: string;
  }[]
}

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const actionSheetRef: any = createRef();

const Push_User_Data_To_RealTime_DB: Push_User_Data_To_RealTime_DB = (profilePicPath: string, userID: string) => {
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

const Profile = ({ userID, navigation, route }: Profile_Props) => {
  const [posts, SetPosts] = useState<number>(0);
  const [response, setResponse] = useState<IState["UserData"]>([]);
  const [profilePic, setProfilePicGallery] = useState<string | null>(null);
  const [myProfilePic, setMyProfilePic] = useState<string | null>(null);
  const [profilePicLoading, setProfilePicLoading] = useState<boolean>(false);
  const [follower, setFollower] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getUserName();
    getProfilePicture();
    getUserInfo();
    getFollowers();
    getPost();
    getMyPosts();
  }, []);

  const getUserName = async (): Promise<void> => {
    const url: string = `https://ampplex-backened.herokuapp.com/getUserNameFromUserID/${userID}/`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserName(data.UserName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (userID == undefined) {
    userID = route.params.userID;
  }

  const getUserInfo = async (): Promise<void> => {
    const url: string = `https://ampplex-backened.herokuapp.com/getUserData/${userID}`;
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBio(data.Bio);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CreateTimeStamp = (time_stamp: string): string => {
    let time_stamp_lst: string | string[] = time_stamp.split("|")[1];
    time_stamp_lst = time_stamp_lst.trim().split(" ");

    const month: string = time_stamp_lst[1];
    const date: number = parseInt(time_stamp_lst[2]);
    const year: number = parseInt(time_stamp_lst[3]);

    const current_year: number = new Date().getFullYear();
    const current_month: string = new Date().toDateString().split(" ")[1];
    const current_date: number = new Date().getDate();

    enum months {
      Jan,
      Feb,
      Mar,
      Apr,
      May,
      Jun,
      Jul,
      Aug,
      Sep,
      Oct,
      Nov,
      Dec,
    };

    if (current_year != year) {
      const yearDifference: number = current_year - year;

      return yearDifference > 1
        ? yearDifference + " years ago"
        : yearDifference + " year ago";
    } else if (current_month === month) {
      const dateDifference: number = current_date - date;

      return dateDifference > 1
        ? dateDifference + " days ago"
        : dateDifference + " day ago";
    } else if (current_month != month) {
      const monthDifference: number = new Date().getMonth() + 1 - (months[month] + 1);

      return monthDifference > 1
        ? monthDifference + " months ago"
        : monthDifference + " month ago";
    }
  };

  const pickImage = async (): Promise<void> => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicGallery(result.uri);
      await SetImage(profilePic);
    }
  };

  const getProfilePicture = async (): Promise<void> => {
    const url: string = `https://ampplex-backened.herokuapp.com/getProfilePicture/${userID}`;
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMyProfilePic(data.profilePic);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserName();
    getProfilePicture();
    getUserInfo();
  }, []);

  const SetImage = async (URI: string) => {
    try {
      const filename: string = "profilePicture";
      const response = await fetch(URI);
      const blob = await response.blob();

      const childPath: string = `post/${userID}/${filename}`;
      console.log(`Child Path is : ${childPath}`);

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
          Alert.alert("Status", "Profile picture successfully updated!");
          setProfilePicLoading(false);
        }
      );
    } catch (e) {
      console.log("UPLOADER ", e);
    }
  };

  const getPost = async (): Promise<void> => {
    const url: string = `https://ampplex-backened.herokuapp.com/Count_Posts/${userID}`;
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        SetPosts(data.Posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMyPosts = async (): Promise<void> => {
    const url: string = `https://ampplex-backened.herokuapp.com/getMyPosts/${userID}`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getFollowers = async (): Promise<void> => {
    const url: string = `https://ampplex-backened.herokuapp.com/GetFollower/${userID}/`;
  
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
      <ScrollView
        style={{
          marginTop: 10,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
            {myProfilePic !== null ? (
              <Image
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 90,
                  position: "absolute",
                  left: 20,
                  top: 70,
                }}
                source={{
                  uri: myProfilePic,
                }}
              />
            ) : (
              <Image
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 90,
                  position: "absolute",
                  left: 20,
                  top: 70,
                }}
                source={require("../assets/images/default_profile_picture.png")}
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

          <View>
            <Text style={styles.PostsNumber}>{posts}</Text>
            <Text
              style={{
                position: "absolute",
                top: 70,
                fontSize: 15,
                fontFamily: "sans-serif-medium",
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
                fontFamily: "sans-serif-medium",
                alignSelf: "center",
                left: 50,
              }}
            >
              Followers
            </Text>
          </View>
          <View style={styles.container}>
            <Text numberOfLines={10} style={styles.bio}>
              {bio}
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
          <EditProfile navigation={navigation} userID={userID} />
        </View>
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
                <More
                  userID={userID}
                  postID={element.Post_ID}
                  navigation={navigation}
                />
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
                  <>
                    <Image
                      source={{
                        uri: element.ImgPath,
                      }}
                      style={styles.postImg}
                    />
                    <Like2
                      postID={element.Post_ID}
                      myUserId={userID}
                      pressedUserID={userID}
                    />
                  </>
                ) : (
                  <>
                    <LongVideo
                      imgPath={element.ImgPath}
                      caption={element.Caption}
                      postID={element.Post_ID}
                      userID={userID}
                      timestamp={element.Timestamp}
                      myUserId={userID}
                      navigation={navigation}
                      userName={userName}
                    />
                    <Like4
                      postID={element.Post_ID}
                      myUserId={userID}
                      pressedUserID={userID}
                    />
                  </>
                )}
                <TouchableOpacity
                  style={{
                    marginLeft: 90,
                    marginTop: -47,
                  }}
                  onPress={() => {
                    let postID = element.Post_ID;
                    let myUserID = userID;
                    let clickedUserID = userID;

                    navigation.navigate("Comments", {
                      myUserID,
                      clickedUserID,
                      postID,
                    });
                  }}
                >
                  <Image
                    style={styles.comment}
                    source={require("../Images/comment-icon.png")}
                  />
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "sans-serif-medium",
                      fontWeight: "600",
                      alignSelf: "flex-start",
                      marginLeft: 20,
                      marginTop: 30,
                    }}
                  >
                    {element.Caption}
                  </Text>
                </View>
                <View>
                    <Text
                      key={index}
                      style={{
                        fontSize: 15,
                        fontWeight: "400",
                        alignSelf: "flex-start",
                        marginLeft: 22,
                        marginTop: 10,
                        fontFamily: "sans-serif-medium",
                        color: "#828282",
                      }}
                    >
                      {CreateTimeStamp(element.Timestamp)}
                    </Text>
                  </View>
                <View
                  style={{
                    marginTop: 70,
                  }}
                />
              </View>
            );
          })
        )}
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  comment: {
    width: 27,
    height: 27,
  },
  Profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 300,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 12,
  },
  Profile2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  UserName: {
    fontSize: 25,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    marginTop: -225,
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.55,
    alignSelf: "center",
  },
  postView: {
    width: "100%",
    backgroundColor: "#fafafa",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 30,
    elevation: 12,
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
  bio: {
    fontFamily: "sans-serif-medium",
    fontSize: 14.5,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 80,
    position: "absolute",
    top: 150,
    alignSelf: "center",
  },
});
