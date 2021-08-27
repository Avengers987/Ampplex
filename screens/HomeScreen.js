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
                  <Text style={{ fontSize: 20 }}>{element["Caption"]}</Text>
                </View>
                <Image
                  source={{
                    uri: element["ImgPath"],
                  }}
                  style={styles.postImg}
                />
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
    height: Dimensions.get("window").height / 1.2,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 30,
  },
  postImg: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 1.5,
    borderRadius: 20,
  },
});
