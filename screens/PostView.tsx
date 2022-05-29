import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from "react-native";
import React from "react";

const PostView = ({ route }: any) => {

  const userName: string = route.params.UserName;
  const caption: string = route.params.Caption;
  const profilePic: string = route.params.ProfilePic;
  const postPic: string = route.params.PostPic;
  const timestamp: string = route.params.Timestamp;

  const CreateTimeStamp = (time_stamp: string): string => {
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
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.Scroll_container}>
        <View style={styles.container}>
          <View style={styles.postView}>

            {/* ProfilePicture */}

            <View>
              <Image
                style={styles.profilePicture}
                source={{ uri: profilePic }}
              />
            </View>

            {/* UserName */}

            <View>
              <Text style={styles.UserName}>{userName}</Text>
            </View>

            {/* PostImage */}

            <View>
              <Image
                style={styles.postImg}
                source={{ uri: postPic }}
              />
            </View>

            {/* Caption */}

            <View>
              <Text style={styles.Caption}>{caption}</Text>
            </View>

            <View>
              <Text
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
                {CreateTimeStamp(timestamp)}
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PostView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Scroll_container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  postView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.7,
    backgroundColor: "#fafafa",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 30,
    elevation: 12,
    position: "absolute",
    top: 0,
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
    position: "absolute",
    top: -Dimensions.get("window").height * 0.05,
  },
  profilePicture: {
    width: 43,
    height: 43,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 15,
  },
  Caption: {
    fontSize: 15,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: 22,
    marginTop: 35,
    fontFamily: "sans-serif-medium",
  }
});
