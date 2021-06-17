import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

export default function Register(props) {
  const SignUp = (username, email, password) => {
    const url = `https://ampplex-backened.herokuapp.com/SignUp/${username}/${email}/${password}`;
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        // console.log(data);
        setLoginResponse(data);
      });
  };

  const ErrorFlasher = (msg) => {
    showMessage({
      message: msg,
      type: "danger",
    });
  };

  const verifyUserInfo = () => {
    // console.log("Entered in verifyUserInfo function");
    console.log(username, email, password);
    setLoginResponse(SignUp(username, email, password));
    if (email.length == 0 || password.length == 0 || username.length == 0) {
      setErrorMessage(
        "Error: Please fill the required informations to proceed ahead!"
      );
      ErrorFlasher(errorMessage);
    } else if (loginResponse == "error") {
      setErrorMessage("Error: Please enter your name and email correctly");
      ErrorFlasher(errorMessage);
    } else if (
      email.length > 0 &&
      password.length >= 8 &&
      username.length > 0
    ) {
      console.log("Registered!");
      setTimeout(() => {
        showMessage({
          message: "Success: Registered successfully",
          type: "success",
        });
      }, 1000);
      setTimeout(() => {
        props.navigation.navigate("Home");
      }, 1100);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.container}
    >
      <View>
        <FlashMessage position="bottom" />
        <View style={styles.Circle} />
        <Text style={styles.Username}>Username</Text>
        <TextInput
          style={styles.UserNameInput}
          placeholder="Enter your username"
          value={username}
          autoFocus
          onChangeText={(e) => {
            setUsername(e);
          }}
        />
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
        <TouchableOpacity
          style={styles.RegisterBtn}
          onPress={() => {
            showMessage({
              message: "JDEF",
              type: "danger",
            });
            console.log("Register pressed!");
            verifyUserInfo();
            // props.navigation.navigate("Home");
          }}
        >
          <Text style={styles.RegisterBtnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Circle: {
    backgroundColor: "#ffff",
    borderRadius: 500,
    position: "absolute",
    width: 520,
    height: 500,
    left: -230,
    top: 15,
  },
  UserNameInput: {
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
  EmailInput: {
    height: 60,
    width: 260,
    borderRadius: 100,
    alignSelf: "center",
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 70,
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
    marginTop: 120,
    position: "absolute",
    top: 60,
  },
  Password: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20,
    marginTop: 250,
    position: "absolute",
    top: 60,
  },
  Username: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20,
    position: "absolute",
    top: 60,
  },
  Circle: {
    backgroundColor: "#ffff",
    borderRadius: 500,
    position: "absolute",
    width: 520,
    height: 500,
    left: -230,
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

  Error: {
    fontSize: 50,
  },
  RegisterBtn: {
    width: 280,
    height: 45,
    backgroundColor: "#87cefa",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 480,
    borderRadius: 50,
    position: "absolute",
  },
  RegisterBtnText: {
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
});
