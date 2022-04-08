import React, { useState, useContext } from "react";
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
import HomeScreen from "./HomeScreen";
import { StatusBar } from "expo-status-bar";
import AddPost from "./AddPost";
import ShortVideo from "./ShortVideo";
import Icon from "react-native-vector-icons/Ionicons";
import Tab_Bar_Color_Context from "../context/tab_bar_color/Tab_Bar_Color_Context";

const Tab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
  const tab_bar_color = useContext(Tab_Bar_Color_Context);

  return (
    <>
      <StatusBar style="auto" />
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: tab_bar_color.color,
          },
        }}
      >
        <Tab.Screen
          name="AddPost"
          children={() => (
            <AddPost userID={route.params.userID} navigation={navigation} />
          )}
          options={{
            tabBarLabel: "Add Post",
            tabBarIcon: ({ color, size }) => (
              <Text
                style={{
                  color: color,
                  fontSize: size,
                  marginTop: 10,
                }}
              >
                +
              </Text>
            ),
          }}
        />

        <Tab.Screen
          name="Home"
          children={() => (
            <HomeScreen
              key={1}
              userID={route.params.userID}
              navigation={navigation}
              userName={route.params.userName}
            />
          )}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home"
                color={color}
                size={size}
                style={{
                  marginTop: 10,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          children={() => (
            <Search navigation={navigation} userID={route.params.userID} />
          )}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="md-search"
                color={color}
                size={size}
                style={{
                  marginTop: 10,
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Short video"
          children={() => (
            <ShortVideo userID={route.params.userID} navigation={navigation} />
          )}
          options={{
            tabBarLabel: "Short videos",
            tabBarIcon: ({ color, size }) => (
              <Text
                style={{
                  color: "white",
                  fontSize: size,
                  marginTop: 10,
                  fontFamily: "sans-serif-medium",
                }}
              >
                <Icon name="md-images-outline" size={20} color={color} />
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          children={() => (
            <Profile
              userName={route.params.userName}
              userID={route.params.userID}
              navigation={navigation}
            />
          )}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
                style={{
                  marginTop: 10,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
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
