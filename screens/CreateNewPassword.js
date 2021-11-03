import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CreateNewPassword = ({ route, navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  let email = route.params.email;

  const errorChecker1 = () => {
    if (password === "") {
      setError1("Password cannot be empty");
    } else if (password.length < 6) {
      setError1("Password must be at least 6 characters");
    } else if (password != confirmPassword) {
      setError1("Password does not match");
      setError2("Password does not match");
    } else {
      setError1("");
    }
  };

  const errorChecker2 = () => {
    if (confirmPassword === "") {
      setError2("Password cannot be empty");
    } else if (confirmPassword.length < 6) {
      setError2("Password must be at least 6 characters");
    } else if (password != confirmPassword) {
      setError1("Password does not match");
      setError2("Password does not match");
    } else {
      setError2("");
    }
  };

  const SubmitBtnHandler = async () => {
    errorChecker1();
    errorChecker2();

    if (error1 === "" && error2 === "" && password === confirmPassword) {
      const url = `https://ampplex-backened.herokuapp.com/CreateNewPassword/${email}/${confirmPassword}/;';][][3543{]';[sidjg868567**-+~&=32057dfjgiodfgoidfo;ji><<><>][[+-`;

      await fetch(url)
        .then((response) => response.text())
        .then((data) => {
          if (data === "success") {
            alert("Password Changed");
            navigation.navigate("Login");
          } else {
            alert("Password not changed");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Create new password</Text>
      <View style={styles.InputPassword}>
        <TextInput
          placeholder={"Enter new password"}
          autoFocus={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.error1}>
        <Text style={styles.error}>{error1}</Text>
      </View>
      <View style={styles.InputConfirmPassword}>
        <TextInput
          placeholder={"Confirm password"}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </View>
      <View style={styles.error2}>
        <Text style={styles.error}>{error2}</Text>
      </View>

      <TouchableOpacity
        style={styles.Button}
        onPress={() => SubmitBtnHandler()}
      >
        <Text style={styles.ButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  InputPassword: {
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
  InputConfirmPassword: {
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
    marginTop: 113,
  },

  Title: {
    fontSize: 25,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    position: "absolute",
    top: Dimensions.get("window").height * 0.11,
    textAlign: "center",
  },
  Button: {
    width: "55%",
    height: 40,
    backgroundColor: "#C83DFC",
    borderRadius: 12,
    elevation: 12,
    position: "absolute",
    top: Dimensions.get("window").height * 0.6 + 25,
  },
  ButtonText: {
    alignSelf: "center",
    fontSize: 17,
    fontFamily: "sans-serif-medium",
    color: "white",
    fontWeight: "bold",
    padding: 5,
  },
  error: {
    color: "red",
    fontSize: 12.5,
    fontFamily: "sans-serif-medium",
    position: "absolute",
    top: Dimensions.get("window").height * 0.4,
    alignSelf: "center",
  },
  error1: {
    position: "absolute",
    top: 0,
  },
  error2: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.2 - 35,
  },
});
