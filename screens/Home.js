import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import ImagePicker from "react-native-image-crop-picker";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const HomeScreen = () => {
    return (
      <>
        <PostBtn />
      </>
    );
  };

  const Profile = () => {
    return (
      <View style={styles.Profile}>
        <Text>Profile</Text>
      </View>
    );
  };

  const Search = () => {
    return (
      <View style={styles.Profile}>
        <Text>Search</Text>
      </View>
    );
  };

  const CameraBtnHandler = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
    });
  };

  const Footer = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  const PostBtn = () => {
    const window_Width = Dimensions.get("window")["width"];
    return (
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 35,
          bottom: 50,
        }}
        onPress={() => {
          navigation.navigate("AddPost");
        }}
      >
        <View style={styles.PostBtnStyle}>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              alignSelf: "center",
              marginTop: 5,
            }}
          >
            +
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Footer />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  homeComponent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  Profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  PostBtnStyle: {
    backgroundColor: "#7b68ee",
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
