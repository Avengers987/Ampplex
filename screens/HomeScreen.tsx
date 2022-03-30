import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
  Share,
  Linking
} from "react-native";
import Header from "./Header";
import LottieView from "lottie-react-native";
import Like from "../components/Like";
import NetInfo from "@react-native-community/netinfo";
import Tab_Bar_Color_Context from "../context/tab_bar_color/Tab_Bar_Color_Context";
import Like4 from "../components/Like4";
import LongVideo from "./LongVideo";

const wait = (timeout: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

interface IState {
  UserData: {
    profilePicPath: string;
    UserID: string;
    UserName: string;
    Type: string;
    ImgPath: string;
    Post_ID: string;
    Caption?: string;
    Timestamp: string;
  }[]
}

type HomeScreen_Props = {
  navigation: any;
  userID: string;
  userName: string;
}

const HomeScreen = ({ navigation, userID, userName }: HomeScreen_Props) => {
  const [response, setResponse] = useState<IState["UserData"]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [connectedToInternet, setConnectedToInternet] = useState<boolean | null>(null);
  const myUserID: string = userID;
  const tab_bar_color = useContext<any>(Tab_Bar_Color_Context);

  const CreateTimeStamp = (time_stamp: string | null): string => {
    if (time_stamp != null) {
    try {
      let time_stamp_lst: string | string[] = time_stamp.split("|")[1];
      time_stamp_lst = time_stamp_lst.trim().split(" ");
      const month: string = time_stamp_lst[1];
      const date: number = parseInt(time_stamp_lst[2]);
      const year: number = parseInt(time_stamp_lst[3]);
  
      const current_year: number = new Date().getFullYear();
      const current_month: string = new Date().toDateString().split(" ")[1];
      const current_date: number = new Date().getDate();
  
      enum months {
        Jan,
        Feb,
        Mar,
        Apr,
        May,
        Jun,
        Jul,
        Aug,
        Sep,
        Oct,
        Nov,
        Dec,
      };
  
      if (current_year != year) {
        const yearDifference: number = current_year - year;
  
        return yearDifference > 1
          ? yearDifference + " years ago"
          : yearDifference + " year ago";
      } else if (current_month === month) {
        const dateDifference: number = current_date - date;
  
        return dateDifference > 1
          ? dateDifference + " days ago"
          : dateDifference + " day ago";
      } else if (current_month != month) {
        const monthDifference: number = new Date().getMonth() + 1 - (months[month] + 1);
  
        return monthDifference > 1
          ? monthDifference + " months ago"
          : monthDifference + " month ago";
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    return "";
  }
  };
  
  useEffect(() => {
    tab_bar_color.changeColor("white");
  }, []);

  const onShare = async (): Promise<void> => {
    try {
      const result = await Share.share({
        message: "https://play.google.com/store/apps/details?id=com.ankeshkumar.Ampplex",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Linking.openURL("https://play.google.com/store/apps/details?id=com.ankeshkumar.Ampplex");

  const ConnectedToInternet = (): void => {
    let connected: boolean | null = null;
    NetInfo.addEventListener((networkState) => {
      connected = networkState.isConnected;
    });
    setConnectedToInternet(connected);
  };

  const getPostInfo = async () : Promise<void> => {
    const url: string = "https://ampplex-backened.herokuapp.com/GetPostJson/";

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRefresh = React.useCallback((): void => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getPostInfo();
  }, []);

  useEffect(() => {
    getPostInfo(); // Calling the getPost API for retrieving user posts
  }, []);

  // Checking if user is connected to the internet or not every 7 seconds
  setInterval(() => {
    ConnectedToInternet();
  }, 7000);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {connectedToInternet == false ? (
          <>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginTop: 30,
              }}
            >
              Not connected to internet !
            </Text>
            <View
              style={{
                alignSelf: "center",
                marginTop: Dimensions.get("window").height / 2.5,
              }}
            >
              <LottieView
                style={styles.notConnectedToInternet}
                source={require("../assets/lottie/no-internet.json")}
                autoPlay
                loop={true}
              />
            </View>
          </>
        ) : loading && connectedToInternet ? (
          <View
            style={{
              alignSelf: "center",
              marginTop: Dimensions.get("window").height / 2.5,
            }}
          >
            <LottieView
              style={styles.LoadingIndicator}
              source={require("../assets/lottie/loading.json")}
              autoPlay
              loop={true}
            />
          </View>
        ) : (
          response.map((element, index: number) => {
            return (
              <>
                <View style={styles.postView} key={index}>
                  <View>
                    {/*Profile Picture*/}
                    {element.profilePicPath != "null" ? (
                      <Image
                        style={styles.profilePicture}
                        source={{
                          uri: element.profilePicPath,
                        }}
                      />
                    ) : (
                      <Image
                        style={styles.profilePicture}
                        source={require("../assets/images/default_profile_picture.png")}
                      />
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.UserNameContainer}
                    onPress={() => {
                      const clickedUserID: string = element.UserID;
                      const clickedUserName: string = element.UserName;
                      const myUserId = userID;
                      navigation.navigate("UserProfile", {
                        clickedUserID,
                        clickedUserName,
                        myUserId,
                      });
                    }}
                  >
                    <Text style={styles.UserName}>{element.UserName}</Text>
                  </TouchableOpacity>
                  {element.Type == "Image" ? (
                    <>
                      <TouchableWithoutFeedback>
                        <Image
                          importantForAccessibility={"yes"}
                          source={{
                            uri: element.ImgPath,
                          }}
                          style={styles.postImg}
                        />
                      </TouchableWithoutFeedback>
                      <Like
                        postID={element.Post_ID}
                        myUserId={userID}
                        pressedUserID={element.UserID}
                      />
                    </>
                  ) : (
                    <>
                      <LongVideo
                        imgPath={element.ImgPath}
                        caption={element.Caption}
                        postID={element.Post_ID}
                        userID={element.UserID}
                        timestamp={element.Timestamp}
                        myUserId={userID}
                        navigation={navigation}
                        userName={userName}
                      />
                      <Like4
                        postID={element.Post_ID}
                        myUserId={userID}
                        pressedUserID={element.UserID}
                      />
                    </>
                  )}

                  <TouchableOpacity
                    key={index}
                    style={{
                      marginLeft: 90,
                      marginTop: -47,
                    }}
                    onPress={() => {
                      let clickedUserID = element.UserID;
                      let postID = element.Post_ID;
                      navigation.navigate("Comments", {
                        myUserID,
                        clickedUserID,
                        postID,
                      });
                    }}
                  >
                    <Image
                      style={styles.comment}
                      source={require("../Images/comment-icon.png")}
                    />
                  </TouchableOpacity>

                  {/* Share button */}
                  <TouchableOpacity
                    style={{
                      marginLeft: 150,
                      marginTop: -32,
                    }}
                    onPress={() => {
                      onShare();
                    }}
                  >
                    <Image
                      style={styles.share}
                      source={require("../assets/images/share-icon.png")}
                    />
                  </TouchableOpacity>

                  <View>
                    <Text
                      key={index}
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        alignSelf: "flex-start",
                        marginLeft: 22,
                        marginTop: 35,
                        fontFamily: "sans-serif-medium",
                      }}
                    >
                      {element.Caption}
                    </Text>
                  </View>
                  <View>
                    <Text
                      key={index}
                      style={{
                        fontSize: 15,
                        fontWeight: "400",
                        alignSelf: "flex-start",
                        marginLeft: 22,
                        marginTop: 10,
                        fontFamily: "sans-serif-medium",
                        color: "#828282",
                      }}
                    >
                      {CreateTimeStamp(element.Timestamp)}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                    }}
                  />
                </View>
              </>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  postView: {
    width: "100%",
    backgroundColor: "#fafafa",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 30,
    elevation: 12,
  },
  postImg: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.55,
    alignSelf: "center",
  },
  UserName: {
    fontSize: 19,
    fontWeight: "bold",
    marginLeft: 80,
    fontFamily: "sans-serif-medium",
  },
  UserNameContainer: {
    marginLeft: 5,
    position: "absolute",
    top: 17,
    width: "60%",
    height: "5%",
  },
  profilePicture: {
    width: 43,
    height: 43,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 15,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  LoadingIndicator: {
    width: 120,
    height: 120,
    marginTop: -10,
    alignItems: "center",
  },
  comment: {
    width: 27,
    height: 27,
  },
  notConnectedToInternet: {
    width: 320,
    height: 320,
    marginTop: -100,
    alignItems: "center",
  },
  videoContainer: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 1.5,
    borderRadius: 20,
    backgroundColor: "#fafa",
  },
  video: {
    width: 365,
    height: 490,
    borderRadius: 15,
  },
  share: {
    width: 35,
    height: 35,
  },
});
