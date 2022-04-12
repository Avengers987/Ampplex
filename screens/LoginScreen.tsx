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
  Pressable,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from 'lottie-react-native';

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

export default function LoginScreen(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [success_resp, setSuccessResp] = useState<string>("red");

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
      setSuccessResp("green");
      setTimeout(() => {
        showMessage({
          message: "Success: Logined successfully!",
          type: "success",
        });
      }, 1000);
      setTimeout(() => {
        storeData("true");
        let userID: string = userId;
        props.navigation.replace("Home", { userID, UserName});
        setEmail("");
        setPassword("");
      }, 1100);
    } else if (password.length < 8) {
      setErrorMessage("Password length must be more than 8 characters");
      ErrorFlasher(errorMessage);
    } else if (!email || !password) {
      // If user didn't filled the required details then showing error
      setErrorMessage("Please enter you email and password to login!");
      ErrorFlasher(errorMessage);
    } else if (loginResponse === "error") {
      setErrorMessage("Invalid email or password!");
      ErrorFlasher(errorMessage);
    }
  };

  const Login = (email: string, password: string): void => {
    // Login method sends the email and password to flask Rest API and get response like "success" or "error"

    if (email.length > 0 && password.length >= 0) {
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
    }
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginResponse, setLoginResponse] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [UserName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  return (
    <ScrollView keyboardShouldPersistTaps={"always"} contentContainerStyle={{
      flex: 1,
    }}>
    <View style={styles.container}>

        <View style={styles.AnimationContainer}>
            <LottieView
            source={require('../assets/lottie/signUp.json')}
            autoPlay={true}
            />
        </View>

        <View style={styles.card}>

            {/* background shape */}

            <View style={{
                width: Dimensions.get('window').width / 1.1,
                height: Dimensions.get('window').width / 1.1,
                position: 'absolute',
                backgroundColor: '#F3F6FD',
                borderBottomEndRadius: Dimensions.get('window').width / 1.4,
                borderBottomRightRadius: Dimensions.get('window').width / 20,
                borderTopRightRadius: Dimensions.get('window').width / 1.1,
                bottom: -Dimensions.get('window').height / 3.55,
            }} />

            {/* Email */}

            <View style={styles.Input}>
                <TextInput
                style={{
                    fontSize: 20,
                    fontFamily: 'sans-serif-medium',
                    color: '#000',
                    alignSelf: 'flex-start',
                    width: Dimensions.get('window').width * 0.85,
                    height: Dimensions.get('window').height * 0.06,
                    paddingBottom: 15,
                    paddingRight: 30
                }}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                />
            </View>
            
            {/* Password */}

            <View style={styles.Input}>
                <TextInput
                style={{
                    fontSize: 20,
                    fontFamily: 'sans-serif-medium',
                    color: '#000',
                    alignSelf: 'flex-start',
                    width: Dimensions.get('window').width * 0.85,
                    height: Dimensions.get('window').height * 0.06,
                    paddingBottom: 15,
                    paddingRight: 30
                }}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                />
            </View>
            
            {/* Error view */}
            <View>
                <Text style={{
                    fontSize: 13,
                    fontFamily: 'sans-serif-medium',
                    alignSelf: 'center',
                    position: 'absolute',
                    top: Dimensions.get('window').height * 0.03,
                    textAlign: 'center',
                    color: success_resp,
                }}>{success_resp === "green" ? "Success !" : errorMessage}</Text>
            </View>

            <Text style={{
                fontSize: 30,
                fontFamily: 'sans-serif-medium',
                alignSelf: 'flex-start',
                fontWeight: 'bold',
                color: '#000',
                marginLeft: 35,
                marginTop: 60,
            }}>Sign In</Text>

        <TouchableOpacity style={styles.nextBtn} onPress={() => LoginBtnHandler()}>
            <Image source={require('../assets/images/arrow.png')} />
        </TouchableOpacity>
        </View>

        <Pressable style={styles.positionSignUpBtn}>
          <Text style={{
            fontSize: 19,
            fontFamily: 'sans-serif-medium',
            alignSelf: 'flex-start',
            fontWeight: 'bold',
          }}
          onPress={() => props.navigation.navigate("Register")}>
          Sign Up</Text>
        </Pressable>

        {/* Forgot password */}

        <Pressable style={styles.positionForgotPasswordBtn}>
          <Text style={{
            fontSize: 15,
            fontFamily: 'sans-serif-medium',
            alignSelf: 'center',
            fontWeight: 'bold',
            color: 'grey',
          }}
          onPress={() => props.navigation.navigate("PhoneNumber")}>
          Forgot Password?</Text>
        </Pressable>
        
        {loading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color="#386DE8" />
          </View>
        ): null}
      <FlashMessage position="bottom" />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBCAE1',
    alignItems: 'center',
    justifyContent: 'center',
},
card: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.55,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
},
AnimationContainer: {
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').width / 1.1,
    position: 'absolute',
    top: 0,
},
Input: {
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').height * 0.06,
    backgroundColor: '#fafafa',
    alignSelf: 'flex-start',
    marginTop: Dimensions.get('window').height * 0.05,
    marginLeft: Dimensions.get('window').width * 0.05,
    borderRadius: 20,
    paddingLeft: Dimensions.get('window').width * 0.05,
    paddingTop: Dimensions.get('window').height * 0.01,
    paddingBottom: Dimensions.get('window').height * 0.01,
},
nextBtn: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.152,
    right: Dimensions.get('window').width * 0.09,
    width: 70,
    height: 70,
    backgroundColor: '#386DE8',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
},
positionSignUpBtn: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.04,
    left: Dimensions.get('window').width * 0.095,
},
positionForgotPasswordBtn: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.045,
    right: Dimensions.get('window').width * 0.15,
},
loadingIndicator: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.13,
},  

});
