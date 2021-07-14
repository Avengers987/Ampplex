import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Category = () => {
  let FontSize = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(FontSize, {
      toValue: 20,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [FontSize]);

  console.log(FontSize);

  return (
    <View style={styles.container}>
      <TextInput placeholder={"Search"} style={styles.searchBox}>
        {require("../Images/2x/outline_search_black_24dp.png")}
      </TextInput>
      <Animated.View>
        {/* {props.children} */}
        <Text style={styles.TitleStyle}>Select your category</Text>
      </Animated.View>

      <ScrollView>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>Coding {"</>"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>JEE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>NEET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>Mechanical</Text>
          <Text numberOfLines={2} style={styles.CodingText}>
            Engineering
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>Acting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 11</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>CBSE Class 12</Text>
        </TouchableOpacity>

        {/* None Button */}
        <TouchableOpacity style={styles.Coding}>
          <Text style={styles.CodingText}>None</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  TitleStyle: {
    // ...props.style,
    fontWeight: "bold",
    fontSize: 30,
    marginTop: Dimensions.get("window").width / 3.5,
  },
  Coding: {
    backgroundColor: "powderblue",
    width: 180,
    height: 50,
    marginTop: 30,
    marginLeft: 10,
    borderRadius: 100,
  },
  CodingText: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },
  searchBox: {
    width: 300,
    height: 50,
    alignSelf: "center",
    position: "absolute",
    top: 50,
    backgroundColor: "#fafafa",
    borderRadius: 20,
    paddingLeft: 120,
    fontSize: 16,
  },
});
