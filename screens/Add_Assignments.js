import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";

const Add_Assignments = () => {
  return (
    <View style={styles.container}>
      <View style={styles.InnerBox}>
        <View style={styles.question}>
          <TextInput
            placeholder="Add question"
            style={{
              fontSize: 17,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Add_Assignments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4267FF",
    alignItems: "center",
    justifyContent: "center",
  },

  InnerBox: {
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").height / 2,
    borderRadius: 20,
    backgroundColor: "#ECEDF1",
    alignSelf: "center",
    marginTop: 30,
    elevation: 20,
  },

  question: {
    alignSelf: "center",
    backgroundColor: "#fff",
    width: Dimensions.get("window").width / 1.2,
    height: 40,
    borderRadius: 20,
    paddingStart: 50,
    paddingTop: 5,
    marginTop: 15,
  },
});
