import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Menu from "../components/Menu";
import Logined_userID_Context from "../context/Logined_userID/Logined_userID_Context";


const Header = ({ navigation }: any) => {

  const [notification_badgeVisible, setnotification_badgeVisible] = useState<boolean>(false);
  const Logined_userID = useContext<any>(Logined_userID_Context);

  const getNotifications = async (): Promise<void> => {
    const url: string = `https://ampplex-backened.herokuapp.com/Check_For_Notifications/${Logined_userID.userID}`;

    await fetch(url)
      .then((response) => {
          return response.json();
      })
      .then((data: any) => {
        console.log(data);
        setnotification_badgeVisible(data.ShowNotification_Badge);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setInterval(() => {
    getNotifications();
  }, 5000);


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
        
        <TouchableOpacity
          style={styles.positionNotification}
          onPress={() => navigation.navigate("Notification")}
        >
          <Image
            style={styles.notification}
            source={require("../assets/images/notification.png")}
          />
          {notification_badgeVisible ? 
          (
            <>
              <View style={styles.Notification_Badge} />
            </>
          )
          : <View/>}
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
    width: Dimensions.get("window").width,
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
  Notification_Badge: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: "red",
    position: "absolute",
    right: Dimensions.get("window").width * 0.015,
    top: Dimensions.get("window").height * 0.005,
  }
});
