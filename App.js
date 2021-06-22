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

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
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
