import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Add_Assignments = ({ route }) => {
  const [question, setQuestion] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const temp_subject = "Theory  of Computation";

  const verifyUserInfo = () => {
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
      return true;
    } else {
      return false;
    }
  };

  const UploadAssignmnement = async () => {
    if (verifyUserInfo()) {
      const url = `https://ampplex-backened.herokuapp.com/UploadAssignment/${route.params.userID}/${route.params.postID}/${temp_subject}/${question}/${option1}/${option2}/${option3}/${option4}/${correctOption}`;
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data === "success") {
            alert("Assignment Uploaded");
          } else {
            alert("Some error occurred!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please fill all the fields");
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
          <View style={styles.optionsContainer}>
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
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
