import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { positionStyle } from "react-native-flash-message";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.homeComponent}>
      <Text>Hello World</Text>
    </View>
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

const PostBtn = () => {
  return (
    <ActionButton
      buttonColor="rgba(231,76,60,1)"
      style={{
        position: "absolute",
        bottom: 50,
      }}
    >
      <ActionButton.Item
        buttonColor="#9b59b6"
        title="Camera"
        onPress={() => console.log("notes tapped!")}
      >
        <Icon name="camera" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        title="Choose picture"
        onPress={() => {}}
      >
        <Icon name="image" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  );
};

const Footer = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          flexDirection: "row",
        },
      }}
    >
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
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Home = () => {
  return (
    <>
      <Footer />
      <PostBtn />
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
  },
  Profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
