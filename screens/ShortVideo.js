import React, { useState, useEffect, useRef, createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import PostSingle from "./PostSingle";

const ShortVideo = ({ userID, navigation }) => {
  // const array = [1, 2, 3, 4, 5, 6];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [response, setResponse] = useState([]);

  const getPostInfo = async () => {
    const url = "https://ampplex-backened.herokuapp.com/GetShortVideos/";

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPostInfo();
  }, []);

  const onViewRef = React.useRef((viewableItems) => {
    try {
      const play = viewableItems["viewableItems"][0].index;
      setCurrentIndex(play);
      console.log(play);
    } catch (e) {
      // console.log(e);
    }
  });

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          backgroundColor: "#000",
        }}
      >
        <PostSingle
          play={index == currentIndex}
          currentIndex={currentIndex}
          index={index}
          navigation={navigation}
          UserName={item.UserName}
          userId={item.UserID}
          url={item.VideoPath}
          caption={item.Caption}
          postID={item.Post_ID}
          myUserId={userID}
          profilePicPath={item.profilePicPath}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={response}
        renderItem={renderItem}
        decelerationRate={"normal"}
        showsVerticalScrollIndicator={false}
        initialNumToRender={1}
        snapToInterval={Dimensions.get("window").height}
        snapToAlignment={"start"}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      <Text style={styles.Title}>Shorts</Text>
    </View>
  );
};

export default ShortVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
  },
  Title: {
    fontSize: 25,
    color: "#fafafa",
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
    position: "absolute",
    top: 30,
    left: 20,
  },
});
