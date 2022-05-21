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
  const [menuBtnPressed, setMenuButtonPressed] = useState<boolean>(false);
  const [closeMenu, setCloseMenu] = useState<boolean>(false);
  let menuBarAnimation: Animated.Value = new Animated.Value(-200);
  let validateLoggedOut: boolean = true;

  useEffect(() => {
    Animated.timing(menuBarAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    menuBarAnimation = new Animated.Value(0);
  }, [menuBtnPressed]);

  useEffect(() => {
    Animated.timing(menuBarAnimation, {
      toValue: -300,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [closeMenu]);

  const MenuBtnHandler = () => {
    setMenuButtonPressed(!menuBtnPressed);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.positionMenuIcon}
        onPress={(): void => MenuBtnHandler()}
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
            width: Dimensions.get("window").width / 1.5,
            height: Dimensions.get("window").height,
            left: -Dimensions.get("window").width / 2,
            elevation: 20,
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            top: -30,
            transform: [{ translateX: menuBarAnimation }],
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setCloseMenu(!closeMenu);
            }}
          >
            <View>
              {/* Menu Button */}
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 17,
                  marginTop: 30,
                }}
                source={require("../Images/menu-icon.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.LogoutBtn}
            onPress={(): void => navigation.replace("Login", { validateLoggedOut })}
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
    top: -2,
    marginLeft: -180,
  },
  LogoutBtn: {
    position: "absolute",
    width: "80%",
    height: "5%",
    top: 60,
    backgroundColor: "#FFD8E0",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 2,
    elevation: 12,
  },
});
