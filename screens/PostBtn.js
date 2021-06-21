import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const getWindowDimensions = () => {
  const dimensions = Dimensions.get("window").width;
  return dimensions;
};

const PostBtn = ({ navigation }) => {
  const window_Width = Dimensions.get("window")["width"];

  return (
    <View>
      <TouchableOpacity
        style={styles.PostBtnStyle}
        onPress={() => {
          navigation.navigate("AddPost");
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              alignSelf: "center",
              marginTop: 5,
            }}
          >
            +
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostBtn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  PostBtnStyle: {
    backgroundColor: "#7b68ee",
    width: 50,
    height: 50,
    borderRadius: 100,
    position: "absolute",
    top: getWindowDimensions() + 200,
    alignSelf: "flex-end",
    right: 25,
  },
});
