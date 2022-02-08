import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "../screens/Register";
import OnboardingScreen from "../screens/OnboardingScreen";
import AddPost from "../screens/AddPost";
import Home from "../screens/Home";
import TakePic from "../screens/TakePic";
import Category from "../screens/Category";
import Profile from "../screens/Profile";
import UserProfile from "../screens/UserProfile";
import Comment from "../screens/Comment";
import StartScreen from "../screens/StartScreen";
import EditProfile from "../screens/EditProfile";
import PhoneNumber from "../screens/PhoneNumber";
import * as firebase from "firebase";
import OTP from "../screens/OTP";
import CreateNewPassword from "../screens/CreateNewPassword";
import PostSingle from "../screens/PostSingle";
import Tab_Bar_Color_State from "../context/tab_bar_color/Tab_Bar_Color_State";
import Comment_State from "../context/Comment/Comment_State";
import Add_Assignments from "../screens/Add_Assignments";
import More from "../components/More";
import Subject from "../screens/Subject";
import Notification from "../screens/Notification";
import Logined_userID_State from "../context/Logined_userID/Logined_userID_State";
import Assignments from "../screens/Assignment";
import PostView from "../screens/PostView";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from "react-native-admob";

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

  // useEffect(() => {
  //   // Display a DFP Publisher banner
  //   // Display an interstitial
  //   AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712");
  //   AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
  //   AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  // }, []);

  return (
    <>
      {/* <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={(error) => console.error(error)}
      /> */}
      <Logined_userID_State>
        <Comment_State>
          <Tab_Bar_Color_State>
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
                      backgroundColor: "#A519F0",
                    },
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                      fontFamily: "sans-serif-medium",
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
                  name="PhoneNumber"
                  component={PhoneNumber}
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="OTP"
                  component={OTP}
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="CreateNewPassword"
                  component={CreateNewPassword}
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

                <Stack.Screen
                  name="PostSingle"
                  component={PostSingle}
                  options={{
                    headerShown: false,
                    headerTitle: "PostSingle",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                />

                <Stack.Screen
                  name="More"
                  component={More}
                  options={{
                    headerShown: false,
                    headerTitle: "More",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                />

                <Stack.Screen
                  name="Add_Assignments"
                  component={Add_Assignments}
                  options={{
                    headerShown: true,
                    headerTitle: "Add Assignments",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                />

                <Stack.Screen
                  name="Subject"
                  component={Subject}
                  options={{
                    headerShown: true,
                    headerTitle: "Add Assignments",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                />

                <Stack.Screen
                  name="Notification"
                  component={Notification}
                  options={{
                    headerShown: true,
                    headerTitle: "Notifications",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                />

                <Stack.Screen
                  name="Assignments"
                  component={Assignments}
                  options={{
                    headerShown: false,
                    headerTitle: "Notifications",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                />

                <Stack.Screen
                  name="PostView"
                  component={PostView}
                  options={{
                    headerShown: false,
                    headerTitle: "Post View",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </Tab_Bar_Color_State>
        </Comment_State>
      </Logined_userID_State>
    </>
  );
}
