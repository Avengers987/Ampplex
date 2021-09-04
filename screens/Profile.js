import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

const Profile = ({ userName, userID }) => {
  const [posts, SetPosts] = useState(0);
  const [response, setResponse] = useState([]);

  const getPost = () => {
    const url = `https://ampplex-backened.herokuapp.com/Count_Posts/${userID}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        SetPosts(data.Posts);
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
      });
  };

  getPost();
  getMyPosts();

  return (
    <>
      <View style={styles.Profile}>
        <Text style={styles.UserName}>{userName}</Text>
        <Image
          style={styles.Profile_Picture}
          source={{
            uri: "https://source.unsplash.com/random/200x200?sig=incrementingIdentifier",
          }}
        />
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
});
