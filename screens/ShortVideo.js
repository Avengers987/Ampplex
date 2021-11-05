import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import PostSingle from "./PostSingle";

const ShortVideo = () => {
  const mediaRefs = useRef([]);
  const array = [1, 2, 3, 4, 5, 6];

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];

      if (cell) {
        console.log("onViewableItemsChanged ", element, element.isViewable);
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          { flex: 1, height: Dimensions.get("window").height - 50 },
          index % 2 === 0
            ? { backgroundColor: "dodgerblue" }
            : { backgroundColor: "#fafa" },
        ]}
      >
        <PostSingle
          ref={(PostSingleRef) => (mediaRefs.current[item] = PostSingleRef)}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={array}
        renderItem={renderItem}
        decelerationRate="normal"
        onViewableItemsChanged={onViewableItemsChanged.current}
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        padingEnabled
        keyExtractor={(item) => item}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
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
