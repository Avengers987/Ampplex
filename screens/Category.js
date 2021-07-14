import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RenderCategory = (name, setCategory) => {
  return (
    <TouchableOpacity
      style={styles.Category}
      onPress={() => setPressedBtn(setCategory === null ? name : setCategory)}
    >
      <Text style={styles.CategoryBtnInnerText}>{name}</Text>
    </TouchableOpacity>
  );
};

const Category = () => {
  const [searchVal, setSearchVal] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [btnColor, setBtnColor] = useState("powderblue");

  console.log(searchVal);
  console.log(pressedBtn);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={"Search"}
        style={styles.searchBox}
        onChangeText={(e) => setSearchVal(e)}
        onFocus={() => console.log("Focused")}
      />
      <Image
        source={require("../Images/2x/outline_search_black_24dp.png")}
        style={styles.searchIcon}
      />
      <View>
        <Text style={styles.TitleStyle}>Select your category</Text>
      </View>

      <ScrollView>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("Coding")}
        >
          <Text style={styles.CategoryBtnInnerText}>Coding {"</>"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("JEE")}
        >
          <Text style={styles.CategoryBtnInnerText}>JEE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("NEET")}
        >
          <Text style={styles.CategoryBtnInnerText}>NEET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("Sports")}
        >
          <Text style={styles.CategoryBtnInnerText}>Sports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("Acting")}
        >
          <Text style={styles.CategoryBtnInnerText}>Acting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 1")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 2")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 3")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 4")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 5")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 6")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 7")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 8")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 9")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 10")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 11")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 11</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("CBSE Class 12")}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 12</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Category}
          onPress={() => setPressedBtn("Mechanical_Engineering")}
        >
          <Text style={styles.CategoryBtnInnerText}>Mechanical</Text>
          <Text numberOfLines={2} style={styles.CategoryBtnInnerText}>
            Engineering
          </Text>
        </TouchableOpacity>

        {/* None Button */}
        <TouchableOpacity style={styles.Category}>
          <Text style={styles.CategoryBtnInnerText}>None</Text>
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
  Category: {
    backgroundColor: "powderblue",
    width: 180,
    height: 50,
    marginTop: 30,
    marginLeft: 10,
    borderRadius: 100,
  },
  CategoryBtnInnerText: {
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
  searchIcon: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 60,
    left: 75,
  },
});
