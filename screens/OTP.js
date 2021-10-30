import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const OTP = ({ route }) => {
  const [enteredOTP, setEnteredOTP] = useState(0);

  const VerifyOTP = () => {
    if (enteredOTP == route.params.otp) {
      console.log("OTP Matched");
      Alert.alert("Success!", "OTP verified!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Verify OTP sent to you mobile number</Text>
      <View style={styles.InputPhoneNumber}>
        <TextInput
          placeholder={"Enter OTP"}
          keyboardType={"number-pad"}
          autoFocus={true}
          maxLength={10}
          onChangeText={(text) => setEnteredOTP(text)}
        />
      </View>

      <TouchableOpacity style={styles.Button} onPress={() => VerifyOTP()}>
        <Text style={styles.ButtonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTP;

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
    fontSize: 20,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    position: "absolute",
    top: Dimensions.get("window").height * 0.11,
    textAlign: "center",
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
