import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Logined_userID_Context from "../context/Logined_userID/Logined_userID_Context";
import Post_Notification from "../components/Post_Notification";
import LottieView from "lottie-react-native";

interface LineBreak_Class_Interface {
  AddbreakLine(): string;
  CaptionAddbreakLine(): string
}

interface IState {
  Notification: {
    read: boolean;
    UserName: string;
    Caption: string;
    ProfilePic: string;
    PostPic: string;
    PostTime: string;
  }[]
}

const Notification = ({ navigation } : any) => {
  const Logined_userID = useContext<any>(Logined_userID_Context);
  const [response, setResponse] = useState<IState["Notification"]>([]);
  const [response2, setResponse2] = useState<IState["Notification"]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(true);

  class LineBreak implements LineBreak_Class_Interface {

    private sent: string;

    constructor(sent: string) {
      this.sent = sent;
    }

    AddbreakLine (): string {
      if (this.sent.length > 15) {
        return this.sent.substring(0, 16) + "\n" + this.sent.substring(16);
      } else {
        return this.sent;
      }
    };
  
    CaptionAddbreakLine(): string {
      if (this.sent.length > 15) {
        return this.sent.substring(0, 22) + "\n" + this.sent.substring(22);
      } else {
        return this.sent;
      }
    };
  }


  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const getNotifications = async (): Promise<void> => {
    let url: string = `https://ampplex-backened.herokuapp.com/Retrieve_Notification/${Logined_userID.userID}/Today`;

    await fetch(url)
      .then((response) => {
          return response.json();
      })
      .then((data: any) => {
        setResponse(data["Notification"]);
        setIsLoading(false);
      })
      .catch((error) => {
        setShowNotification(false);
      });

    url = `https://ampplex-backened.herokuapp.com/Retrieve_Notification/${Logined_userID.userID}/Older`;

    await fetch(url)
      .then((response) => {
          return response.json();
      })
      .then((data: any) => {
        setResponse2(data["Notification"]);
        setIsLoading(false);
      })
      .catch((error) => {
        setShowNotification(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getNotifications();
  }, []);

  useEffect(() => {
    getNotifications();
  }, []);

  setInterval(() => {
    // Fetching for new notifications every 5 seconds
    getNotifications();
  }, 5000);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Dimensions.get("window").height,
          backgroundColor: "#fff",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <Text style={styles.Day_Text}>Today</Text>
        </View>

        {!isLoading && showNotification ? (
          response.map((element, index: number) => {
            return (
              <Post_Notification
                read={element.read}
                UserName={element.UserName}
                Caption={element.Caption}
                ProfilePic={element.ProfilePic}
                PostPic={element.PostPic}
                Timestamp={element.PostTime}
                key={index}
                navigation={navigation}
              />
            );
          })
        ) : 
          <>
          {showNotification ? 
            <View
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                style={styles.loading}
                source={require("../assets/lottie/loading-notifications.json")}
                autoPlay
                loop={true}
              />
            </View>
          : <View/>}
            {showNotification === false ? 
            <>
              <View>
                <Text style={styles.No_Notification}>No notifications</Text>
              </View>
            </> 
            : <View/>}
          </>
        }

        <View>
          <Text style={styles.Day_Text}>This Week</Text>
        </View>

        {!isLoading ? (
          response2.map((element, index: number) => {
            return (
              <Post_Notification
                read={element.read}
                UserName={element.UserName}
                Caption={element.Caption}
                ProfilePic={element.ProfilePic}
                PostPic={element.PostPic}
                Timestamp={element.PostTime}
                key={index}
                navigation={navigation}
              />
            );
          })
        ) : 
          <>
          {showNotification ? 
            <View
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                style={styles.loading}
                source={require("../assets/lottie/loading-notifications.json")}
                autoPlay
                loop={true}
              />
            </View>
          : <View/>}
            {showNotification === false ? 
            <>
              <View>
                <Text style={styles.No_Notification}>No notifications</Text>
              </View>
            </> 
            : <View/>}
          </>
        }

      </ScrollView>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -15,
  },
  Day_Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "sans-serif-medium",
    marginTop: Dimensions.get("window").height * 0.05,
    marginLeft: Dimensions.get("window").width * 0.05,
  },
  ProfilePicture: {
    width: 45,
    height: 45,
    borderRadius: 40,
    position: "absolute",
    left: 50,
    top: Dimensions.get("window").height * 0.08,
  },
  red_circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff0000",
    position: "absolute",
    left: 20,
    top: Dimensions.get("window").height * 0.1,
  },
  postPic: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  userName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "dodgerblue",
    textAlign: "center",
    fontFamily: "sans-serif-medium",
  },
  userNamePosition: {
    justifyContent: "center",
    marginTop: Dimensions.get("window").height * 0.08,
    marginLeft: Dimensions.get("window").width * 0.28,
    alignSelf: "flex-start",
  },
  caption: {
    fontSize: 12.5,
    color: "#B1B1B1",
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
    marginTop: Dimensions.get("window").height * 0.02,
    marginLeft: Dimensions.get("window").width * 0.15,
  },
  breakpointStyle: {
    height: 1.5,
    backgroundColor: "#F0EFEF",
    width: Dimensions.get("window").width / 1.2,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 5,
  },
  CaptionPosition: {
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.13,
  },
  PostPicPosition: {
    alignSelf: "flex-end",
    position: "absolute",
    top: Dimensions.get("window").height * 0.08,
    right: Dimensions.get("window").width * 0.05,
  },
  message: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#B1B1B1",
    fontFamily: "sans-serif-medium",
  },
  MessagePosition: {
    alignSelf: "flex-end",
    marginRight: Dimensions.get("window").width * 0.25,
    position: "absolute",
    top: Dimensions.get("window").height * 0.08,
    right: Dimensions.get("window").width * 0.02,
  },
  loading: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 20,
  },
  No_Notification: {
    textAlign: "center", 
    fontSize: 20, 
    fontWeight: "bold",
  }
});
