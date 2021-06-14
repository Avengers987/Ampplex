import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const ErrorFlasher = (msg) => {
  showMessage({
    message: msg,
    type: "danger",
  });
};

export default function LoginScreen(props) {
  const Login = (email, password) => {
    // Login method sends the email and password to flask Rest API and get response like "success" or "error"

    const url = `https://ampplex-backened.herokuapp.com/Login/${email}/${password}`;
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setLoginResponse(data);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.Circle} />
      <Text style={styles.AppName}>Ampplex</Text>
      <Text style={styles.Email}>Email</Text>
      <TextInput
        style={styles.EmailInput}
        placeholder="Enter your email-id"
        type="email"
        value={email}
        autoFocus
        onChangeText={(e) => {
          setEmail(e);
        }}
      />
      <Text style={styles.Password}>Password</Text>
      <TextInput
        style={styles.PasswordInput}
        placeholder="Enter your password"
        type="password"
        secureTextEntry
        value={password}
        autoFocus
        onChangeText={(e) => {
          setPassword(e);
        }}
      />
      <View>
        <TouchableOpacity>
          <Text style={styles.RegisterText}>
            Don't have an Ampplex account?
          </Text>
          <Text style={styles.RegisterBtn}>Register</Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
      <View>
        <TouchableOpacity
          onPress={() => {
            setLoginResponse(Login(email, password));
            if (
              loginResponse === "success" &&
              email.length > 0 &&
              password.length > 0
            ) {
              props.navigation.navigate("Home");
            } else if (!email || !password) {
              setErrorMessage(
                "Error: Please enter you email and password to login!"
              );
              ErrorFlasher(errorMessage);
            } else if (loginResponse === "error") {
              setErrorMessage("Error: Your email or password is incorrect!");
              ErrorFlasher(errorMessage);
            }
          }}
        >
          {/* <Text>Login</Text> */}
          <Image
            source={require("../Images/next.png")}
            style={styles.NavigateNextIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F4F5F7",
    width: "100%",
    height: "100%",
  },
  AppName: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
    alignSelf: "center",
    marginTop: 60,
  },
  EmailInput: {
    height: 60,
    width: 260,
    borderRadius: 100,
    alignSelf: "center",
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 100,
    borderColor: "#BAB7C3",
    paddingHorizontal: 16,
    backgroundColor: "#87cefa",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
  },
  PasswordInput: {
    height: 60,
    width: 260,
    borderRadius: 30,
    alignSelf: "center",
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 90,
    borderColor: "#BAB7C3",
    paddingHorizontal: 16,
    backgroundColor: "#87cefa",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
  },
  Email: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20,
    marginTop: 65,
    position: "absolute",
    top: 60,
  },
  Password: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20,
    marginTop: 220,
    position: "absolute",
    top: 60,
  },
  Circle: {
    backgroundColor: "#ffff",
    borderRadius: 500,
    position: "absolute",
    width: 520,
    height: 500,
    left: -160,
    top: 15,
  },
  NavigateNextIcon: {
    alignSelf: "flex-end",
    marginRight: 70,
    marginTop: 80,
  },
  RegisterText: {
    fontSize: 17,
    alignSelf: "center",
    position: "absolute",
    left: 12,
    top: 20,
  },
  RegisterBtn: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 35,
    fontSize: 20,
    top: 20,
    color: "#00ffff",
  },
  Error: {
    // color: "red",
    // // flexDirection: "row",
    // // alignSelf: "flex-start",
    fontSize: 50,
  },
});
