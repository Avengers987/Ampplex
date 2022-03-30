import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";

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
      ></TouchableOpacity>
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
    borderRadius: 10,
    position: "absolute",
    top: Dimensions.get("window").height * 0.6,
  },
  ButtonText: {
    fontSize: 18,
    fontFamily: "sans-serif-medium",
    color: "white",
    alignSelf: "center",
    marginTop: Dimensions.get("window").height / 70,
    fontWeight: "bold",
  },
  Error: {
    color: "red",
    fontSize: 12,
    fontFamily: "sans-serif-medium",
    position: "absolute",
    top: Dimensions.get("window").height * 0.4,
  },
  linearGradient: {
    width: 250,
    height: 50,
    borderRadius: 40,
    elevation: 12,
    alignSelf: "center",
  },
});
