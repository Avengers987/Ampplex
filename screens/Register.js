import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

const ErrorFlasher = (msg) => {
  showMessage({
    message: msg,
    type: "danger",
  });
};

const Cryptography_Encrypt = (text) => {
  const alpha = {
    a: 2073,
    b: 2076,
    c: 2079,
    d: 2082,
    e: 2085,
    f: 2088,
    g: 2091,
    h: 2094,
    i: 2097,
    j: 2100,
    k: 2103,
    l: 2106,
    m: 2109,
    n: 2112,
    o: 2115,
    p: 2118,
    q: 2121,
    r: 2124,
    s: 2127,
    t: 2130,
    u: 2133,
    v: 2136,
    w: 2139,
    x: 2142,
    y: 2145,
    z: 2148,
    " ": 2151,
    1: 234,
    2: 89,
    3: 45,
    4: 1095,
    5: 77,
    6: 12,
    7: 61,
    8: 55,
    9: 23,
    0: 22,
    "`": 1288,
    "~`": 226096,
    "!": 33,
    "@": 44,
    "#": 59,
    $: 66,
    "%": 7754,
    "^": 88,
    "&": 99,
    "*": 401,
    "(": 402,
    ")": 403,
    "-": 404,
    _: "405",
    "=": 406,
    "+": 407,
    "[": 408,
    "]": 409,
    "{": 410,
    "}": 411,
    "\\": 412,
    "|": 413,
    ";": 414,
    ":": 415,
    "'": 416,
    '"': 417,
    ",": 418,
    ".": 419,
    "/": 420,
    "?": 422,
    A: 630,
    B: 632,
    C: 634,
    D: 636,
    E: "638",
    F: 640,
    G: 642,
    H: 644,
    I: 646,
    J: 648,
    K: 650,
    L: 652,
    M: 654,
    N: 656,
    O: 658,
    P: 660,
    Q: 662,
    R: 664,
    S: 666,
    T: 668,
    U: 670,
    V: 672,
    W: 674,
    X: 676,
    Y: 678,
    Z: 680,
  };

  let encryptedTxt = "";
  let firstTime = true;

  text = text.split("");

  console.log(text);

  text.forEach((e) => {
    if (firstTime) {
      encryptedTxt += alpha[e];
      firstTime = false;
    } else {
      encryptedTxt += " ";
      encryptedTxt += alpha[e];
    }
  });

  console.log(encryptedTxt);
  return encryptedTxt;
};

export default function Register(props) {
  const SignUp = (username, email, password) => {
    const url = `https://ampplex-backened.herokuapp.com/SignUp/${username}/${email}/${Cryptography_Encrypt(
      password.trim()
    )}`;
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setLoginResponse(data);
      });
  };

  const verifyUserInfo = () => {
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
      setTimeout(() => {
        showMessage({
          message: "Success: Registered successfully",
          type: "success",
        });
      }, 1000);
      setTimeout(() => {
        props.navigation.navigate("Login");
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
            verifyUserInfo();
          }}
        >
          <Text style={styles.RegisterBtnText}>Register</Text>
        </TouchableOpacity>
        <FlashMessage position="bottom" />
      </View>
      <View
        style={{
          backgroundColor: "lightgrey",
          width: 90,
          height: 4,
          borderRadius: 20,
          alignSelf: "center",
          position: "absolute",
          top: Dimensions.get("window").height * 0.75,
        }}
      />
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
    marginTop: 100,
    borderColor: "#fafafa",
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    elevation: 12,
  },
  EmailInput: {
    height: 60,
    width: 260,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 70,
    borderColor: "#fafafa",
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    elevation: 12,
  },
  PasswordInput: {
    height: 60,
    width: 260,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 90,
    borderColor: "#fafafa",
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    elevation: 12,
  },
  Email: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20,
    marginTop: 120,
    position: "absolute",
    fontFamily: "sans-serif-medium",
    top: 60,
  },
  Password: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20,
    marginTop: 250,
    position: "absolute",
    fontFamily: "sans-serif-medium",
    top: 60,
  },
  Username: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20,
    position: "absolute",
    fontFamily: "sans-serif-medium",
    top: 50,
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
    fontFamily: "san-serif-medium",
    left: 12,
    top: 20,
  },

  Error: {
    fontSize: 50,
  },
  RegisterBtn: {
    width: 280,
    height: 45,
    backgroundColor: "#A519F0",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 480,
    borderRadius: 50,
    position: "absolute",
    elevation: 12,
  },
  RegisterBtnText: {
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
});
