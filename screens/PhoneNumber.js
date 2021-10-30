import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const PhoneNumber = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [otp, setOtp] = useState(0);

  const generateOTP = () => {
    let OTP = Math.round(Math.random() * 10 * new Date().getMilliseconds());

    setOtp(OTP);
  };

  const sendOTP = async () => {
    generateOTP();

    const url = `https://ampplex-backened.herokuapp.com/SendOTP/${phoneNumber}/Ampplex : Your OTP is ${otp}. Please do not share it with anyone/`;

    console.log("Length is ", toString(phoneNumber).length, phoneNumber);

    if (phoneNumber != null && toString(phoneNumber).length == 10) {
      navigation.navigate("OTP", { otp });
    }

    await fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log("sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Phone Number</Text>
      <View style={styles.InputPhoneNumber}>
        <TextInput
          placeholder={"Enter your phone number"}
          keyboardType={"number-pad"}
          autoFocus={true}
          maxLength={10}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      <TouchableOpacity style={styles.Button} onPress={() => sendOTP()}>
        <Text style={styles.ButtonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  InputPhoneNumber: {
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
});
