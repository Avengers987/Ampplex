import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";

const Search = () => {
  const gradient_Coordinate = new Animated.Value(0);

  Animated.timing(gradient_Coordinate, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();

  return (
    <>
      <Animated.View
        style={{
          width: 500,
          alignItems: "center",
        }}
      >
        <LinearGradient
          start={{ x: 0.5, y: 0.7 }}
          end={{ x: 0, y: 0 }}
          colors={["white", "silver"]}
          style={styles.linearGradient}
        ></LinearGradient>
      </Animated.View>
    </>
  );
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    width: 300,
    height: 350,
    marginRight: 90,
    marginTop: 50,
  },
});
