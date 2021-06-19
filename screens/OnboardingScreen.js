import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Done = ({ ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text
        style={{
          alignSelf: "flex-end",
          fontSize: 15,
          fontWeight: "bold",
          color: "skyblue",
          marginRight: 20,
        }}
      >
        Done
      </Text>
    </TouchableOpacity>
  );
};

const Skip = ({ ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          color: "skyblue",
          alignSelf: "flex-start",
          marginLeft: 20,
        }}
      >
        Skip
      </Text>
    </TouchableOpacity>
  );
};

const Next = ({ ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          marginRight: 20,
          color: "skyblue",
          alignSelf: "flex-end",
        }}
      >
        Next
      </Text>
    </TouchableOpacity>
  );
};

export default function OnboardingScreen({ navigation }) {
  // Calling the getData() method to check if is user is logined or not
  getData();
  async function getData() {
    const value = await AsyncStorage.getItem("isLogined_Boolean");
    console.log(value);
    if (value !== null) {
      // If user is already logined then navigating the user to the Home screen
      navigation.replace("Home");
    } else {
      // If user is not logined then displaying the onboarding screen
      return (
        <Onboarding
          DoneButtonComponent={Done}
          SkipButtonComponent={Skip}
          NextButtonComponent={Next}
          onSkip={() => navigation.replace("Login")}
          onDone={() => navigation.replace("Login")}
          pages={[
            {
              backgroundColor: "#fff",
              image: (
                <Image
                  style={{
                    width: 300,
                    height: 300,
                  }}
                  source={require("../Images/onboarding1.png")}
                />
              ),
              title: (
                <Text style={styles.Title_Screen1}>Create with Ampplex</Text>
              ),
              subtitle: (
                <Text style={styles.Descript_Screen1}>
                  Spread Education To all over the world
                </Text>
              ),
            },
            {
              backgroundColor: "#ffff",
              image: (
                <Image
                  style={{
                    width: 300,
                    height: 300,
                  }}
                  source={require("../Images/onboarding2.png")}
                />
              ),
              title: (
                <Text style={styles.Title_Screen2}>
                  Create educational videos so that we can stop other
                  distractions
                </Text>
              ),
              subtitle: (
                <Text style={styles.Descript_Screen2}>
                  Because when the world come on social media to study it get
                  distracted and to avoid that please help us to make this world
                  a better place
                </Text>
              ),
            },
          ]}
        />
      );
    }
  }
  return <View />;
}

const styles = StyleSheet.create({
  Title_Screen1: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  Descript_Screen1: {
    fontSize: 18,
    fontWeight: "400",
    color: "grey",
    marginTop: 16,
    alignSelf: "center",
  },
  Title_Screen2: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 4,
  },
  Descript_Screen2: {
    fontSize: 15,
    fontWeight: "400",
    color: "grey",
    marginTop: 16,
    alignSelf: "center",
    marginLeft: 4,
  },
});
