import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";

const Block_report = ({ userID, myUserID }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalClick = () => {
    setModalVisible(!isModalVisible);
  };

  const handleBlock = () => {
    const url = `https://ampplex-backened.herokuapp.com/BlockUser/${userID}/${myUserID}`;

    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data === "success") {
          alert("User Blocked");
        }
      });
  };

  return (
    <>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          top: 3,
        }}
        onPress={() => {
          handleModalClick();
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={require("../assets/images/more-icon.png")}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "white",
              width: "80%",
              height: "27%",
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleBlock();
                handleModalClick();
              }}
            >
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: "10%",
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                Block
              </Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "lightgrey",
                height: 1,
                width: "100%",
                marginTop: "6%",
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 35,
                right: 120,
              }}
              onPress={() => {
                handleModalClick();
              }}
            >
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: "20%",
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                  left: "18%",
                }}
              >
                Report
              </Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "lightgrey",
                height: 1,
                width: "100%",
                marginTop: 55,
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 20,
                right: 120,
              }}
              onPress={() => {
                handleModalClick();
              }}
            >
              <Text
                style={{
                  color: "skyblue",
                  textAlign: "center",
                  marginTop: "2.5%",
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                  left: "18%",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default Block_report;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
