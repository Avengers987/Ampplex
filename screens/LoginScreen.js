import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ErrorFlasher = (msg) => {
  showMessage({
    message: msg,
    type: "danger",
  });
};

export default function LoginScreen(props) {
  getData();
  const storeData = async (value) => {
    // value take boolean type value
    try {
      await AsyncStorage.setItem("isLogined_Boolean", value);
      await AsyncStorage.setItem("user_name", UserName);
      await AsyncStorage.setItem("user_id", userId);
    } catch (e) {
      ErrorFlasher("Error: Failed to store login info!");
    }
  };

  async function getData() {
    try {
      const value = await AsyncStorage.getItem("isLogined_Boolean");
      const userName = await AsyncStorage.getItem("user_name");
      const user_id = await AsyncStorage.getItem("user_id");

      if (value !== null && userName !== null && user_id !== null) {
        props.navigation.replace("Category");
      }
    } catch (e) {
      // error reading value
      ErrorFlasher("Error: Failed to retrieve your login info!");
    }
  }

  const LoginBtnHandler = () => {
    Login(email, password);
    if (
      loginResponse === "success" &&
      email.length > 0 &&
      password.length >= 8
    ) {
      // If there is success response from the backened server then redirecting user to the home page
      setTimeout(() => {
        showMessage({
          message: "Success: Logined successfully!",
          type: "success",
        });
      }, 1000);
      setTimeout(() => {
        storeData("true");
        props.navigation.navigate("Category");
        setEmail("");
        setPassword("");
      }, 1100);
    } else if (password.length < 8) {
      setErrorMessage("Error: Password length must be more than 8 characters");
      ErrorFlasher(errorMessage);
    } else if (!email || !password) {
      // If user didn't filled the required details then showing error
      setErrorMessage("Error: Please enter you email and password to login!");
      ErrorFlasher(errorMessage);
    } else if (loginResponse === "error") {
      // If user entered incorrect email or password then showing error
      setErrorMessage("Error: Your email or password is incorrect!");
      ErrorFlasher(errorMessage);
    }
  };

  const Login = (email, password) => {
    // Login method sends the email and password to flask Rest API and get response like "success" or "error"

    const url = `https://ampplex-backened.herokuapp.com/Login/${email}/${password}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.status);
        setLoginResponse(data.status);
        setUserName(data.UserName);
        setUserId(data.user_id);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [UserName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

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
      <FlashMessage position="bottom" />
      <TouchableOpacity style={styles.LoginBtn} onPress={LoginBtnHandler}>
        <Text style={styles.LoginBtnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.RegisterBtn}
        onPress={() => {
          props.navigation.navigate("Register");
        }}
      >
        <Text style={styles.RegisterBtnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  LoginBtn: {
    width: 280,
    height: 45,
    backgroundColor: "#87cefa",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    borderRadius: 50,
  },
  LoginBtnText: {
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
  RegisterBtn: {
    width: 280,
    height: 45,
    backgroundColor: "#87cefa",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 50,
  },
  RegisterBtnText: {
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
});
