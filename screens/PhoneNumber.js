import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// import auth from "@react-native-firebase/auth";
import firebase from "firebase";

const email = ({ navigation }) => {
  const [email, setEmail] = useState("");
  let otp = Math.floor(1000 + Math.random() * 9000);
  const [error, setError] = useState("");

  const sendOTP = async () => {
    const url = `https://ampplex-backened.herokuapp.com/SendOTP/${email.trim()}/Ampplex : Your OTP is ${otp}. Please do not share it with anyone/`;

    if (email.length >= 3) {
      setError("");
    }

    if (email != null && email.trim().length >= 3) {
      navigation.navigate("OTP", {
        email: email.trim(),
        otp: otp,
      });
      await fetch(url)
        .then((res) => res.text())
        .then((data) => {
          if (data == "success") {
            console.log("OTP sent successfully!");
          } else {
            setError(data);
          }
        })
        .catch((error) => console.log(error));
    } else if (email == null || email.length < 3) {
      setError("Invalid email address");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Verify email</Text>
      <View style={styles.InputEmail}>
        <TextInput
          placeholder={"Enter your email address"}
          autoFocus={true}
          maxLength={100}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <Text style={styles.Error}>{error}</Text>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          sendOTP();
        }}
      >
        <Text style={styles.ButtonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default email;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  InputEmail: {
    width: "85%",
    height: 60,
    alignSelf: "center",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 20,
    elevation: 12,
    position: "absolute",
    top: Dimensions.get("window").height * 0.3,
  },
  Title: {
    fontSize: 25,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    position: "absolute",
    top: Dimensions.get("window").height * 0.11,
  },
  Button: {
    width: "55%",
    height: 40,
    backgroundColor: "#5AFF60",
    borderRadius: 10,
    elevation: 12,
    position: "absolute",
    top: Dimensions.get("window").height * 0.6,
  },
  ButtonText: {
    alignSelf: "center",
    fontSize: 17,
    fontFamily: "sans-serif-medium",
    color: "white",
    fontWeight: "bold",
    padding: 5,
  },
  Error: {
    color: "red",
    fontSize: 12,
    fontFamily: "sans-serif-medium",
    position: "absolute",
    top: Dimensions.get("window").height * 0.4,
  },
});
