import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Menu from "../components/Menu";

const Header = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Menu navigation={navigation} />
        <View
          style={{
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35,
              transform: [{ rotate: "180deg" }],
              elevation: 0,
              borderRadius: 100,
              position: "absolute",
              top: -20,
              left: -60,
            }}
          >
            V
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "sans-serif-medium",
              position: "absolute",
              top: -15,
              left: -25,
            }}
          >
            Ampplex
          </Text>
        </View>
        <TouchableOpacity style={styles.positionNotification}>
          <Image
            style={styles.notification}
            source={require("../assets/images/notification.png")}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 400,
    backgroundColor: "#fff",
    elevation: 40,
    borderBottomRightRadius: 100,
  },
  menuIcon: {
    width: 30,
    height: 30,
    position: "absolute",
    top: -10,
    marginLeft: -180,
  },
  notification: {
    width: 35,
    height: 35,
  },
  positionNotification: {
    position: "absolute",
    right: 46,
    top: 20,
  },
});
