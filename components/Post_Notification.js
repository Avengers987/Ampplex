import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";

const Post_Notification = ({
  read,
  UserName,
  Caption,
  ProfilePic,
  PostPic,
  Timestamp,
}) => {
  const AddbreakLine = (sent) => {
    if (sent.length > 15) {
      return sent.substring(0, 18) + "\n" + sent.substring(18);
    } else {
      return sent;
    }
  };

  const CaptionAddbreakLine = (sent) => {
    if (sent.length > 15) {
      return sent.substring(0, 22) + "\n" + sent.substring(22);
    } else {
      return sent;
    }
  };

  const CreateTimeStamp = (time_stamp) => {
    let time_stamp_lst = time_stamp.split("|")[1];
    time_stamp_lst = time_stamp_lst.trim().split(" ");

    let month = time_stamp_lst[1];
    let date = time_stamp_lst[2];
    let year = time_stamp_lst[3];

    let current_year = new Date().getFullYear();
    let current_month = new Date().toDateString().split(" ")[1];
    let current_date = new Date().getDate();

    const months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    if (current_year != year) {
      let yearDifference = current_year - year;

      return yearDifference > 1
        ? yearDifference + " years ago"
        : yearDifference + " year ago";
    } else if (current_month === month) {
      let dateDifference = new Date().getDate() - date;

      return dateDifference > 1
        ? dateDifference + " days ago"
        : dateDifference + " day ago";
    } else if (current_month != month) {
      let monthDifference = new Date().getMonth() + 1 - (months[month] + 1);

      return monthDifference > 1
        ? monthDifference + " months ago"
        : monthDifference + " month ago";
    }
  };

  useEffect(() => {
    CreateTimeStamp("22:54:34 | Fri Sep 24 2021");
  }, []);

  return (
    <>
      <TouchableOpacity style={styles.container}>
        {!read ? <View style={styles.red_circle} /> : null}

        {/* ProfilePicture */}

        <Image
          source={{
            uri: ProfilePic,
          }}
          style={styles.ProfilePicture}
        />

        {/* UserName */}

        <View style={styles.userNamePosition}>
          <Text style={styles.userName}>{AddbreakLine(UserName)}</Text>
        </View>

        {/* Caption */}

        <View style={styles.CaptionPosition}>
          <Text style={styles.caption}>{CaptionAddbreakLine(Caption)}</Text>
        </View>

        <View style={styles.MessagePosition}>
          <Text style={styles.message}>Posted:</Text>
        </View>

        <View style={styles.PostTimePosition}>
          <Text style={styles.PostTime}>{CreateTimeStamp(Timestamp)}</Text>
        </View>

        <View style={styles.breakpointStyle} />

        <View style={styles.PostPicPosition}>
          <Image
            style={styles.postPic}
            source={{
              uri: PostPic,
            }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Post_Notification;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  Day_Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "sans-serif-medium",
    marginTop: Dimensions.get("window").height * 0.05,
    marginLeft: Dimensions.get("window").width * 0.05,
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
  PostTime: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#B1B1B1",
    fontFamily: "sans-serif-medium",
  },
  PostTimePosition: {
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.28,
    marginTop: 5,
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
    textAlign: "center",
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
  postPic: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  PostPicPosition: {
    alignSelf: "flex-end",
    position: "absolute",
    top: Dimensions.get("window").height * 0.08,
    right: Dimensions.get("window").width * 0.05,
  },
});
