import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";

const Add_Assignments = ({ route, navigation }: any) => {
  let [question, setQuestion] = useState<string>("");
  const [correctOption, setCorrectOption] = useState<string>("");
  const [option1, setOption1] = useState<string>("");
  const [option2, setOption2] = useState<string>("");
  const [option3, setOption3] = useState<string>("");
  const [option4, setOption4] = useState<string>("");
  const subject: string = route.params.subject;
  const userID: string = route.params.userID;
  const postID: string = route.params.postID;

  const showToast = (): void => {
    ToastAndroid.show("Assignment uploaded!", ToastAndroid.SHORT);
  };

  const verifyUserInfo = (): boolean | string => {
    if (
      question != null &&
      question != "" &&
      correctOption != null &&
      correctOption != "" &&
      option1 != null &&
      option1 != "" &&
      option2 != null &&
      option2 != "" &&
      option3 != null &&
      option3 != "" &&
      option4 != null &&
      option4 != ""
    ) {
      if (
        option1.includes("/") ||
        option2.includes("/") ||
        option3.includes("/") ||
        option4.includes("/")
      ) {
        return "Please do not use '/' in your options";
      }
      return true;
    } else {
      return "Please fill all the fields";
    }
  };

  const UploadAssignmnement = async (): Promise<void> => {
    if (verifyUserInfo() === true) {
      const url = `https://ampplex-backened.herokuapp.com/UploadAssignment/${userID}/${postID}/${subject}/${question.replace(
        "?",
        ""
      )}/${option1}/${option2}/${option3}/${option4}/${correctOption}/${question.includes(
        "?"
      )}`;

      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            showToast();
          }
          navigation.replace("Add_Assignments", {
            subject,
            userID,
            postID,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert(verifyUserInfo());
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.InnerBox}>
          <View style={styles.question}>
            <TextInput
              placeholder={"Enter question"}
              onChangeText={(e) => setQuestion(e)}
              value={question}
              style={{
                fontSize: 17,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                fontFamily: "sans-serif-medium",
                marginTop: 17,
                alignSelf: "center",
              }}
            >
              OPTIONS
            </Text>
            <TextInput
              placeholder={"Enter option A"}
              style={styles.option}
              onChangeText={(text) => setOption1(text)}
            />
            <TextInput
              placeholder={"Enter option B"}
              style={styles.option}
              onChangeText={(text) => setOption2(text)}
            />
            <TextInput
              placeholder={"Enter option C"}
              style={styles.option}
              onChangeText={(text) => setOption3(text)}
            />
            <TextInput
              placeholder={"Enter option D"}
              style={styles.option}
              onChangeText={(text) => setOption4(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.next}
            onPress={() => UploadAssignmnement()}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                fontFamily: "sans-serif-medium",
                textAlign: "center",
                color: "white",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "sans-serif-medium",
            marginTop: 15,
            alignSelf: "center",
          }}
        >
          Choose the correct option
        </Text>
        <View style={styles.correctOptionContainer}>
          <TouchableOpacity
            style={
              correctOption === "A"
                ? styles.choosedCorrectOption
                : styles.correct_option
            }
            onPress={() => {
              if (correctOption === "A") {
                setCorrectOption("");
              } else {
                setCorrectOption("A");
              }
            }}
          >
            <Text style={styles.optionText}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              correctOption === "B"
                ? styles.choosedCorrectOption
                : styles.correct_option
            }
            onPress={() => {
              if (correctOption === "B") {
                setCorrectOption("");
              } else {
                setCorrectOption("B");
              }
            }}
          >
            <Text style={styles.optionText}>B</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              correctOption === "C"
                ? styles.choosedCorrectOption
                : styles.correct_option
            }
            onPress={() => {
              if (correctOption === "C") {
                setCorrectOption("");
              } else {
                setCorrectOption("C");
              }
            }}
          >
            <Text style={styles.optionText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              correctOption === "D"
                ? styles.choosedCorrectOption
                : styles.correct_option
            }
            onPress={() => {
              if (correctOption === "D") {
                setCorrectOption("");
              } else {
                setCorrectOption("D");
              }
            }}
          >
            <Text style={styles.optionText}>D</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Add_Assignments;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  InnerBox: {
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").height / 1.6,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignSelf: "center",
    elevation: 20,
    marginTop: -100,
  },

  question: {
    alignSelf: "center",
    backgroundColor: "#ECEDF1",
    width: Dimensions.get("window").width / 1.2,
    height: 40,
    borderRadius: 20,
    paddingStart: 50,
    paddingTop: 5,
    marginTop: 15,
  },

  option: {
    alignSelf: "center",
    backgroundColor: "#ECEDF1",
    width: Dimensions.get("window").width / 1.2,
    height: 40,
    borderRadius: 20,
    paddingStart: 50,
    paddingTop: 5,
    marginTop: 30,
  },
  correctOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  optionText: {
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
    textAlign: "center",
    paddingTop: 10,
  },
  correct_option: {
    width: Dimensions.get("window").width / 5,
    height: Dimensions.get("window").height / 14,
    borderRadius: 20,
    backgroundColor: "#fafafa",
    marginTop: 35,
    elevation: 20,
    marginRight: 10,
  },

  choosedCorrectOption: {
    width: Dimensions.get("window").width / 5,
    height: Dimensions.get("window").height / 14,
    borderRadius: 20,
    backgroundColor: "#5AFF60",
    marginTop: 35,
    elevation: 20,
    marginRight: 10,
  },
  next: {
    alignSelf: "center",
    backgroundColor: "#5AFF60",
    width: Dimensions.get("window").width / 3,
    height: 40,
    borderRadius: 20,
    elevation: 20,
    marginTop: 30,
  },
});
