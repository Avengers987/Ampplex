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
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";

const Profile = ({ navigation, route }) => {
  const [posts, SetPosts] = useState(0);
  const [response, setResponse] = useState([]);
  const [myProfilePic, setMyProfilePic] = useState(null);
  const [profilePicLoading, setProfilePicLoading] = useState(true);
  const [follower, setFollower] = useState(0);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [alreadyFollowed, setAlreadyFollowed] = useState(null);
  const [loading, setLoading] = useState(true);

  const userID = route.params.clickedUserID;
  const userName = route.params.clickedUserName;
  const myUserId = route.params.myUserId;

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

  const Check_Followed = async () => {
    const url = `http://ampplex-backened.herokuapp.com/Check_Followed/${userID}/MyID/${myUserId}`;
    console.log(url, "See me!");
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "success" && data.Already_Followed == "true") {
          console.log("Already followed!");
          setAlreadyFollowed(true);
        } else if (
          data.status === "success" &&
          data.Already_Followed == "false"
        ) {
          setAlreadyFollowed(false);
          console.log("Following for the first time!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (userID != myUserId) {
    useEffect(() => {
      Check_Followed();
    }, []);
  }

  console.log(alreadyFollowed);

  const IncreaseFollower = async () => {
    const url = `http://ampplex-backened.herokuapp.com/Increament_Followers/${userID}/MyID/${myUserId}`;
    console.log(url, "See me!");
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          console.log("Followed Successfully!");
        }
      })
      .catch((e) => {
        console.log(e);
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
        setProfilePicLoading(false);
      })
      .catch((err) => {
        console.log(e);
      });
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
        console.log(e);
      });
  };

  useEffect(() => {
    getProfilePicture();
    getMyPosts();
    getPost();
    getFollowers();
  }, []);

  return (
    <>
      <View style={styles.Profile}>
        <Text style={styles.UserName}>{userName}</Text>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 20,
          }}
        >
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
        </View>

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
        {alreadyFollowed == true ? (
          <TouchableOpacity
            style={styles.FollowBtn}
            onPress={() => {
              if (follower >= 0) {
                setFollower(follower - 1);
              }
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "white",
                alignSelf: "center",
              }}
            >
              Unfollow
            </Text>
          </TouchableOpacity>
        ) : alreadyFollowed == false ? (
          <TouchableOpacity
            style={styles.FollowBtn}
            onPress={() => {
              IncreaseFollower();
              setFollower(follower + 1);
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "white",
                alignSelf: "center",
              }}
            >
              Follow
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

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
          response.map((element) => {
            return (
              <View style={styles.postView}>
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
                  <Text style={styles.UserName}>{element["UserName"]}</Text>
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
      </ScrollView>
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
  FollowBtn: {
    backgroundColor: "dodgerblue",
    width: 100,
    height: 30,
    borderRadius: 5,
    position: "absolute",
    bottom: 100,
    left: 170,
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
  video: {
    alignSelf: "center",
    width: 365,
    height: 490,
    borderRadius: 15,
  },
});
