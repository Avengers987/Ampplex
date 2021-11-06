import React, { useState, useEffect, useRef, createRef } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import PostSingle from "./PostSingle";

const ShortVideo = () => {
  const array = [1, 2, 3, 4, 5, 6];

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          backgroundColor: "#000",
        }}
      >
        <PostSingle />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={array}
        renderItem={renderItem}
        decelerationRate={"fast"}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height}
        snapToAlignment={"start"}
      />
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
});
