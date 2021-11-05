import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";

const More = ({ userID, postID }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalClick = () => {
    setModalVisible(!isModalVisible);
  };

  const DeletePost = async () => {
    const url = `https://ampplex-backened.herokuapp.com/DeletePost/${userID}/${postID}`;

    await fetch(url)
      .then((response) => response.text())
      .then((data) => {
        if (data === "success") {
          alert("Post Deleted");
        } else {
          console.log(data);
          alert("Some error occurred!");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Some error occurred!");
      });
  };

  return (
    <>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 30,
          top: 20,
        }}
        onPress={() => {
          console.log("Some ID's ", userID, postID);
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
              height: "20%",
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                DeletePost();
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
                Delete
              </Text>
            </TouchableOpacity>
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
                  textAlign: "center",
                  color: "skyblue",
                  fontWeight: "bold",
                  fontFamily: "sans-serif-medium",
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

export default More;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
