import React from "react";
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
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const HomeScreen = () => {
  // return (
  //   <SkeletonPlaceholder>
  //     <View style={{ flexDirection: "row", alignItems: "center" }}>
  //       <View style={{ width: 60, height: 60, borderRadius: 50 }} />
  //       <View style={{ marginLeft: 20 }}>
  //         <View style={{ width: 120, height: 20, borderRadius: 4 }} />
  //         <View
  //           style={{
  //             marginTop: 6,
  //             width: 80,
  //             height: 20,
  //             borderRadius: 4,
  //           }}
  //         />
  //       </View>
  //     </View>
  //   </SkeletonPlaceholder>
  // );

  return (
    <View style={styles.Profile}>
      <ScrollView>
        <View style={styles.postView}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1610660976739-381ccfce53e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            }}
            style={styles.postImg}
          />
        </View>
        <View style={styles.postView}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1628118103616-eb8f49391db4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80",
            }}
            style={styles.postImg}
          />
        </View>
        <View style={styles.postView}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
            }}
            style={styles.postImg}
          />
        </View>
        <View style={styles.postView}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1542546068979-b6affb46ea8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            }}
            style={styles.postImg}
          />
        </View>
        <View style={styles.postView}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1579803815615-1203fb5a2e9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            }}
            style={styles.postImg}
          />
        </View>
        <View style={styles.postView}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1610660976739-381ccfce53e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            }}
            style={styles.postImg}
          />
        </View>
      </ScrollView>
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
