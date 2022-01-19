import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Vibration,
} from "react-native";

const Subject = ({ route, navigation }) => {
  const userID = route.params.userID;
  const postID = route.params.postID;
  const select_subject = new Animated.Value(-30);
  const Animated_Box_opacity = new Animated.Value(0);
  let error_container_animation = new Animated.Value(0);
  const [error, setError] = useState("");
  let [subject, setSubject] = useState("");

  useEffect(() => {
    Animated.timing(select_subject, {
      toValue: Dimensions.get("window").height / 5.5,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(Animated_Box_opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const Capitalize_Str = (str) => {
    // Capitalizing subject before passing it to the Add_Assignments screen as a prop

    // example :- "maths" -> "Maths"

    let new_str = "";

    str = str.trim();
    str = str.toLowerCase();

    for (let i = 0; i < str.length; i++) {
      if (i === 0) {
        new_str += str[i].toUpperCase();
      } else {
        new_str += str[i];
      }
    }

    return new_str;
  };

  const verifyUserInfo = async () => {
    if (subject === "" || subject === null) {
      setError("Please enter a subject to continue!");
      Vibration.vibrate(200);

      setTimeout(() => {
        Animated.timing(error_container_animation, {
          toValue: -70,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }, 100);

      setTimeout(() => {
        Animated.timing(error_container_animation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }, 200);

      setTimeout(() => {
        Animated.timing(error_container_animation, {
          toValue: 70,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }, 300);

      setTimeout(() => {
        Animated.timing(error_container_animation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }, 400);

      return false;
    }

    subject = Capitalize_Str(subject);

    navigation.navigate("Add_Assignments", {
      subject,
      userID,
      postID,
    });
    return true;
  };

  return (
    <>
      <View style={styles.container}>
        <Animated.View
          style={{
            display: "flex",
            flex: 1,
            backgroundColor: "#fafafa",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: error_container_animation,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: "#fafafa",
              width: Dimensions.get("window").width / 1.1,
              height: Dimensions.get("window").height / 3,
              padding: 12,
              elevation: 10,
              borderRadius: 30,
              alignSelf: "center",
              justifyContent: "center",
              marginTop: select_subject,
              opacity: Animated_Box_opacity,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "sans-serif-medium",
                alignSelf: "center",
                color: "#393939",
                marginTop: -50,
              }}
            >
              Type subject name
            </Text>
            <View style={styles.sub_inp}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter subject name"
                onChangeText={(text) => {
                  if (subject != "" || subject != null) {
                    setError("");
                  }
                  setSubject(text);
                }}
                value={subject}
              />
            </View>
            <View style={styles.error}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  fontFamily: "sans-serif-medium",
                  alignSelf: "center",
                  color: "red",
                }}
              >
                {error}
              </Text>
            </View>
          </Animated.View>
        </Animated.View>

        <TouchableOpacity
          style={styles.Next_btn}
          onPress={() => {
            verifyUserInfo();
          }}
        >
          <Text style={styles.btn_text}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Subject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    width: "100%",
    height: "100%",
  },
  sub_inp: {
    marginTop: 40,
    alignSelf: "center",
    backgroundColor: "#ECEDF1",
    width: Dimensions.get("window").width / 1.3,
    height: Dimensions.get("window").height / 18,
    borderRadius: 30,
  },
  textInput: {
    display: "flex",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  Next_btn: {
    marginBottom: 200,
    alignSelf: "center",
    backgroundColor: "#5AFF60",
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 18,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 12,
  },
  btn_text: {
    fontSize: 19,
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
    color: "#fff",
    textAlign: "center",
  },
  error: {
    marginTop: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width / 1.3,
    height: Dimensions.get("window").height / 18,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
