import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/Register";
import OnboardingScreen from "./screens/OnboardingScreen";
import AddPost from "./screens/AddPost";
import Home from "./screens/Home";
import TakePic from "./screens/TakePic";
import Category from "./screens/Category";
import Profile from "./screens/Profile";
import UserProfile from "./screens/UserProfile";
import Comment from "./screens/Comment.js";
import StartScreen from "./screens/StartScreen";
import EditProfile from "./screens/EditProfile";

import * as firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Till Now Ampplex is made up of 2,018 lines of code!

const firebaseConfig = {
  apiKey: "AIzaSyB_vMbdEOmrMH_Eo4IuNkuObyY_ACLI5-k",
  authDomain: "ampplex-75da7.firebaseapp.com",
  databaseURL: "https://ampplex-75da7-default-rtdb.firebaseio.com",
  projectId: "ampplex-75da7",
  storageBucket: "ampplex-75da7.appspot.com",
  messagingSenderId: "730587965700",
  appId: "1:730587965700:web:7c71f40fd541c7b91bc851",
  measurementId: "G-BSPPZFVTMS",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="OnBoarding"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Comments"
          component={Comment}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerStyle: {
              backgroundColor: "#87cefa",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white",
            },
          }}
        />
        <Stack.Screen
          name="TakePic"
          component={TakePic}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPost}
          options={{
            headerStyle: {
              backgroundColor: "#87cefa",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white",
            },
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: true,
            headerTitle: "Edit Profile",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
  },
});
