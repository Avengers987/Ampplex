import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
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
  useEffect(() => {
    getData();
  }, []);

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
      const value = await AsyncStorage.removeItem("isLogined_Boolean");
      const userName = await AsyncStorage.removeItem("user_name");
      const user_id = await AsyncStorage.removeItem("user_id");

      if (value !== null && userName !== null && user_id !== null) {
        props.navigation.replace("Category", { user_id, userName });
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
        let user_id = userId;
        props.navigation.replace("Category", { user_id });
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

    const url = `https://ampplex-backened.herokuapp.com/Login/${email.trim()}/${password.trim()}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.status);
        setLoginResponse(data.status);
        setUserName(data.UserName);
        setUserId(data.user_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [UserName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.Circle} />
      <View>
        <Image
          style={styles.AppName}
          source={require("../assets/images/Ampplex-Logo.png")}
        />
      </View>
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
      <View style={styles.Circle2} />
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
      <View
        style={{
          backgroundColor: "lightgrey",
          width: 70,
          height: 4,
          borderRadius: 20,
          alignSelf: "center",
          position: "absolute",
          top: Dimensions.get("window").height * 0.9,
        }}
      />
      <Text style={styles.forgotPassword}>Forgot password? </Text>
      <Text
        onPress={() => props.navigation.navigate("PhoneNumber")}
        style={{
          fontSize: 15,
          fontFamily: "sans-serif-medium",
          fontWeight: "bold",
          position: "absolute",
          top: Dimensions.get("window").height - 45,
          alignSelf: "center",
          right: Dimensions.get("window").width * 0.3 - 15,
        }}
      >
        reset
      </Text>
    </ScrollView>
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
    position: "absolute",
    width: 170,
    height: 170,
    alignSelf: "center",
    borderRadius: 200,
  },
  EmailInput: {
    height: 60,
    width: 280,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 190,
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    elevation: 5,
  },
  PasswordInput: {
    height: 60,
    width: 280,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 90,
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    elevation: 5,
  },
  Email: {
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "sans-serif-medium",
    marginLeft: 20,
    marginTop: 65,
    position: "absolute",
    top: 60,
  },
  Password: {
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "sans-serif-medium",
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
    left: -170,
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
    height: 40,
    backgroundColor: "#A519F0",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    borderRadius: 50,
    elevation: 12,
  },
  LoginBtnText: {
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "sans-serif-medium",
  },
  RegisterBtn: {
    width: 280,
    height: 40,
    backgroundColor: "#A519F0",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    borderRadius: 50,
    elevation: 12,
  },
  RegisterBtnText: {
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "sans-serif-medium",
  },
  Circle2: {
    backgroundColor: "#fff",
    borderRadius: 500,
    position: "absolute",
    width: 280,
    height: 280,
    left: 200,
    bottom: -80,
  },
  forgotPassword: {
    fontSize: 15,
    fontFamily: "sans-serif-medium",
    position: "absolute",
    top: Dimensions.get("window").height - 45,
    left: 100,
    alignSelf: "center",
  },
});
