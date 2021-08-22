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

const HomeScreen = () => {
  let [response, setResponse] = useState("");
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

  // function RenderUserPost(key) {
  //   // console.log(response[key]["UserName"]);
  //   return (
  //     <View style={styles.postView}>
  //       <View>
  //         <Text style={{ fontSize: 20 }}>{response[key]["Caption"]}</Text>
  //       </View>
  //       <Image
  //         source={{
  //           uri: response[key]["ImgPath"],
  //         }}
  //         style={styles.postImg}
  //       />
  //     </View>
  //   );
  // }

  getPostInfo();
  // for (let key in response) {
  console.log(typeof response);
  // let obj = { abo: "Hello", op: "kl" };
  // Object.keys(response).map((e) => {
  //   return (
  //     <View>
  //       <Image
  //         source={{
  //           uri: response[e]["ImgPath"],
  //         }}
  //       />
  //     </View>
  //   );
  // });

  return (
    <View style={styles.Profile}>
      <ScrollView>
        {Object.keys(response).map((e) => {
          {
            console.log(response[e]["UserName"]);
          }
          return (
            <View style={styles.postView}>
              <View>
                <Text style={{ fontSize: 20 }}>{response[e]["Caption"]}</Text>
              </View>
              <Image
                source={{
                  uri: response[e]["ImgPath"],
                }}
                style={styles.postImg}
              />
            </View>
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
