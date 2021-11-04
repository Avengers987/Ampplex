import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

const Menu = ({ navigation }) => {
  const [menuBtnPressed, setMenuButtonPressed] = useState(false);
  const [menuIconOpacity, setMenuIconOpacity] = useState(1);
  const menuBarAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(menuBarAnimation, {
      toValue: Dimensions.get("window").width / 1.5,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [menuBtnPressed]);

  const MenuBtnHandler = () => {
    setMenuButtonPressed(!menuBtnPressed);
    setMenuIconOpacity(!menuIconOpacity);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.positionMenuIcon}
        onPress={() => MenuBtnHandler()}
      >
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={require("../Images/menu-icon.png")}
        />
      </TouchableOpacity>
      {menuBtnPressed ? (
        <Animated.View
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            width: menuBarAnimation,
            height: Dimensions.get("window").height,
            left: -Dimensions.get("window").width / 2,
            elevation: 12,
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            top: -30,
          }}
        >
          <TouchableOpacity onPress={() => MenuBtnHandler()}>
            <View>
              {/* Menu Button */}
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 17,
                  marginTop: 15,
                }}
                source={require("../Images/menu-icon.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.LogoutBtn}
            onPress={() => navigation.navigate("Login")}
          >
            {/* Log out button */}
            <Text
              style={{
                fontSize: 15,
                alignSelf: "center",
                fontWeight: "bold",
                fontFamily: "sans-serif-medium",
                color: "#FF5D77",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  positionMenuIcon: {
    position: "absolute",
    top: -15,
    marginLeft: -180,
  },
  LogoutBtn: {
    position: "absolute",
    width: "80%",
    height: "5%",
    top: 50,
    backgroundColor: "#FFD8E0",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 2,
    elevation: 12,
  },
});
