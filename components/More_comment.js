import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import Comment_Context from "../context/Comment/Comment_Context";

const More_comment = ({ clickedUserID, postID, commentID }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModal2Visible, setisModal2Visible] = useState(false);
  const comment_context = useContext(Comment_Context);

  const handleModalClick = () => {
    setModalVisible(!isModalVisible);
  };

  const handleModal2Click = () => {
    setisModal2Visible(!isModal2Visible);
  };

  const DeleteComment = async () => {
    const url = `https://ampplex-backened.herokuapp.com/DeleteComment/${clickedUserID}/${postID}/${commentID}`;

    await fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data != "success") {
          alert("Some error occurred!");
        }
      })
      .catch((error) => {
        alert("Some error occurred!");
      });

    comment_context.changeShouldReload(true);
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
              height: "20%",
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleModalClick();
                handleModal2Click();
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
                  marginTop: "2%",
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

        {/* Modal 2 starts from here, which will prompt to the user "Are you sure you want to delete?" */}
        <Modal isVisible={isModal2Visible}>
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "white",
              width: "90%",
              height: "23%",
              borderRadius: 20,
              paddingTop: "3%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "sans-serif-medium",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              Are you sure you want to delete?
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleModal2Click();
                DeleteComment();
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
                Yes
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
                color: "skyblue",
                textAlign: "center",
                marginTop: "5%",
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
              onPress={() => {
                handleModal2Click();
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
                No
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default More_comment;

const styles = StyleSheet.create({
  modal: {
    alignSelf: "center",
    backgroundColor: "white",
    width: "80%",
    height: "20%",
    borderRadius: 20,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
