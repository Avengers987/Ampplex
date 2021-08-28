import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./Profile";
import Header from "./Header";

const HomeScreen = () => {
  let [response, setResponse] = useState([]);
  const getPostInfo = async () => {
    const url = "https://ampplex-backened.herokuapp.com/GetPostJson/";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data);
      });
  };

  getPostInfo(); // Calling the getPost API for retrieving user posts

  return (
    <View style={styles.Profile}>
      <ScrollView>
        <Header />
        {response.map((element) => {
          return (
            <>
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
            </>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        404 NOT FOUND
      </Text>
    </View>
  );
};

export default HomeScreen;

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
  },
  postView: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 1.1,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 30,
  },
  postImg: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 1.5,
    borderRadius: 20,
    marginTop: 10,
  },
  UserName: {
    fontSize: 19,
    fontWeight: "bold",
  },
  UserNameContainer: {
    marginLeft: 80,
    position: "absolute",
    top: 20,
  },
  profilePicture: {
    width: 43,
    height: 43,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 15,
  },
});
