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
  ActivityIndicator,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ErrorFlasher = (msg: string): void => {
  showMessage({
    message: msg,
    type: "danger",
  });
};

const Cryptography_Encrypt = (text: string): string => {
  const alpha: object = {
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

  let encryptedTxt: string = "";
  let firstTime: boolean = true;

  const text_Arr: string[] = text.split("");

  text_Arr.forEach((e) => {
    if (firstTime) {
      encryptedTxt += alpha[e];
      firstTime = false;
    } else {
      encryptedTxt += " ";
      encryptedTxt += alpha[e];
    }
  });

  return encryptedTxt;
};

const Cryptography_Decrypt = (encryptedTxt: string): string => {
  const alpha_num: object = {
    2073: "a",
    2076: "b",
    2079: "c",
    2082: "d",
    2085: "e",
    2088: "f",
    2091: "g",
    2094: "h",
    2097: "i",
    2100: "j",
    2103: "k",
    2106: "l",
    2109: "m",
    2112: "n",
    2115: "o",
    2118: "p",
    2121: "q",
    2124: "r",
    2127: "s",
    2130: "t",
    2133: "u",
    2136: "v",
    2139: "w",
    2142: "x",
    2145: "y",
    2148: "z",
    2151: " ",
    234: "1",
    89: "2",
    45: "3",
    1095: "4",
    77: "5",
    12: "6",
    61: "7",
    55: "8",
    23: "9",
    22: "0",
    1288: "`",
    226096: "~",
    33: "!",
    44: "@",
    59: "#",
    66: "$",
    7754: "%",
    88: "^",
    99: "&",
    401: "*",
    402: "(",
    403: ")",
    404: "-",
    405: "_",
    406: "=",
    407: "+",
    408: "[",
    409: "]",
    410: "{",
    411: "}",
    412: "\\",
    413: "|",
    414: ";",
    415: ":",
    416: "'",
    417: '"',
    418: ",",
    419: ".",
    420: "/",
    422: "?",
    630: "A",
    632: "B",
    634: "C",
    636: "D",
    638: "E",
    640: "F",
    642: "G",
    644: "H",
    646: "I",
    648: "J",
    650: "K",
    652: "L",
    654: "M",
    656: "N",
    658: "O",
    660: "P",
    662: "Q",
    664: "R",
    666: "S",
    668: "T",
    670: "U",
    672: "V",
    674: "W",
    676: "X",
    678: "Y",
    680: "Z",
  };

  let decryptedTxt: string = "";

  const encryptedLst: string[] = encryptedTxt.split(" ");

  encryptedLst.forEach((element) => {
    decryptedTxt += alpha_num[element];
  });

  return decryptedTxt;
};

export default function LoginScreen(props: any) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (value: string): Promise<void> => {
    // value take boolean type value
    try {
      await AsyncStorage.setItem("isLogined_Boolean", value);
      await AsyncStorage.setItem("user_name", UserName);
      await AsyncStorage.setItem("user_id", userId);
    } catch (e) {
      ErrorFlasher("Error: Failed to store login info!");
    }
  };

  const getData = async (): Promise<void> => {
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

  const LoginBtnHandler = (): void => {
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
        let user_id: string = userId;
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

  const Login = (email: string, password: string): void => {
    // Login method sends the email and password to flask Rest API and get response like "success" or "error"
    setLoading(true); // Activating the Activity Indicator

    const url: string = `https://ampplex-backened.herokuapp.com/Login/${email.trim()}/${Cryptography_Encrypt(
      password.trim()
    )}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.status);
        setLoginResponse(data.status);
        setUserName(data.UserName);
        setUserId(data.user_id);
        setLoading(false); // Deactivating the Activity Indicator
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginResponse, setLoginResponse] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [UserName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

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
        textContentType="emailAddress"
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
        textContentType="password"
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

      <View style={styles.LoadingIndicator}>
        {loading ? (
          <ActivityIndicator size="large" color="skyblue" />
        ) : (
          <View />
        )}
      </View>

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
    fontWeight: "bold",
    position: "absolute",
    top: Dimensions.get("window").height - 45,
    alignSelf: "center",
    right: Dimensions.get("window").width * 0.42,
  },
  LoadingIndicator: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.78,
    alignSelf: "center",
  },
});
