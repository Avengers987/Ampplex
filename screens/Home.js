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
import Search from "./Search";
import Profile from "./Profile";
import PostBtn from "./PostBtn";
import HomeScreen from "./HomeScreen";
import { StatusBar } from "expo-status-bar";

const getWindowDimensions = () => {
  const dimensions = Dimensions.get("window").width;
  return dimensions;
};
const getWindowDimensionsHeight = () => {
  const dimensions = Dimensions.get("window").height;
  return dimensions;
};

const Tab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
  return (
    <>
      <StatusBar style="auto" />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
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
      <TouchableOpacity
        style={styles.PostBtnStyle}
        onPress={() => {
          const userID = route.params.userID;
          console.log("Home : ", userID);
          navigation.navigate("AddPost", { userID });
        }}
      >
        <View>
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
    position: "absolute",
    bottom: 100,
    alignSelf: "flex-end",
    right: 25,
  },
});
