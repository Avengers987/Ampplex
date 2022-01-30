import React, { useState, useEffect, FunctionComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const OTP = ({ route, navigation } : any) => {
  const [enteredOTP, setEnteredOTP] = useState<number | string>(0);
  const [time, setTime] = useState<number>(120);
  const email: string = route.params.email;
  const [otp, setOTP] = useState<number>(route.params.otp);

  const VerifyOTP = () : void => {
    if (enteredOTP == otp) {
      console.log(otp);
      console.log("OTP Matched");
      Alert.alert("Success!", "OTP verified!");
      navigation.navigate("CreateNewPassword", { email });
    } else {
      Alert.alert("Error!", "OTP does not match!");
    }
  };

  // Implementing a timer using recursion algorithm
  const timer = (sec: number) => {
    if (sec == -1) {
      let OTP: number = Math.floor(1000 + Math.random() * 9000);
      setOTP(OTP);
      const url: string = `https://ampplex-backened.herokuapp.com/SendOTP/${email}/Ampplex : Your OTP is ${OTP}. Please do not share it with anyone/`;

      fetch(url)
        .then((res) => res.text())
        .then((data) => {
          if (data == "success") {
            console.log("OTP sent successfully!");
          }
        })
        .catch((error) => console.log(error));
      return;
    }

    setTimeout(() => {
      timer(sec - 1);
    }, 1000);

    setTime(sec);
  };

  useEffect(() => {
    timer(120);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Verify OTP sent to your email address</Text>
      <View style={styles.InputOTP}>
        <TextInput
          placeholder={"Enter OTP"}
          keyboardType={"number-pad"}
          autoFocus={true}
          maxLength={10}
          onChangeText={(text) => setEnteredOTP(text)}
        />
      </View>

      <View>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 15,
            fontWeight: "bold",
            fontFamily: "sans-serif-medium",
          }}
        >
          Resending in {time}
        </Text>
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
  InputOTP: {
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
