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
import { SearchBar } from "react-native-elements";

const Category = () => {
  const [searchVal, setSearchVal] = useState(null); // stores the search value
  const [pressedBtn, setPressedBtn] = useState(null); // Stores the pressed button name

  const [icon, setIcon] = useState(
    require("../Images/2x/outline_search_black_24dp.png")
  );

  const [iconType, setIconType] = useState("search");

  // Category button colors
  const [btnColor, setBtnColor] = useState("powderblue");
  const [btnColor1, setBtnColor1] = useState("powderblue");
  const [btnColor2, setBtnColor2] = useState("powderblue");
  const [btnColor3, setBtnColor3] = useState("powderblue");
  const [btnColor4, setBtnColor4] = useState("powderblue");
  const [btnColor5, setBtnColor5] = useState("powderblue");
  const [btnColor6, setBtnColor6] = useState("powderblue");
  const [btnColor7, setBtnColor7] = useState("powderblue");
  const [btnColor8, setBtnColor8] = useState("powderblue");
  const [btnColor9, setBtnColor9] = useState("powderblue");
  const [btnColor10, setBtnColor10] = useState("powderblue");
  const [btnColor11, setBtnColor11] = useState("powderblue");
  const [btnColor12, setBtnColor12] = useState("powderblue");
  const [btnColor13, setBtnColor13] = useState("powderblue");
  const [btnColor14, setBtnColor14] = useState("powderblue");
  const [btnColor15, setBtnColor15] = useState("powderblue");
  const [btnColor16, setBtnColor16] = useState("powderblue");
  const [btnColor17, setBtnColor17] = useState("powderblue");
  const [btnColor18, setBtnColor18] = useState("powderblue");
  const [btnColor19, setBtnColor19] = useState("powderblue");

  const animatedSearchBar = new Animated.Value(0);

  Animated.timing(animatedSearchBar, {
    toValue: 100,
    duration: 1000,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={"Search"}
        style={styles.searchBox}
        onChangeText={(e) => setSearchVal(e)}
        onFocus={() => {
          setIconType("back");
          setIcon(require("../Images/2x/back.png"));
        }}
      />
      <Image
        onPress={() => {
          if (iconType === "back") {
            setIcon(require("../Images/2x/outline_search_black_24dp.png"));
            // setIconType("search");
          }
        }}
        source={icon}
        style={styles.searchIcon}
      />
      <View>
        <Text style={styles.TitleStyle}>Select your category</Text>
      </View>

      <ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("Coding");
            if (btnColor === "skyblue") {
              setBtnColor("powderblue");
            } else {
              setBtnColor("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>Coding {"</>"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor1,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("JEE");
            if (btnColor1 === "skyblue") {
              setBtnColor1("powderblue");
            } else {
              setBtnColor1("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>JEE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor2,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("NEET");
            if (btnColor2 === "skyblue") {
              setBtnColor2("powderblue");
            } else {
              setBtnColor2("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>NEET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor3,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("Sports");
            if (btnColor3 === "skyblue") {
              setBtnColor3("powderblue");
            } else {
              setBtnColor3("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>Sports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: btnColor4,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("Acting");
            if (btnColor4 === "skyblue") {
              setBtnColor4("powderblue");
            } else {
              setBtnColor4("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>Acting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor5,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 1");
            if (btnColor5 === "skyblue") {
              setBtnColor5("powderblue");
            } else {
              setBtnColor5("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor6,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 2");
            if (btnColor6 === "skyblue") {
              setBtnColor6("powderblue");
            } else {
              setBtnColor6("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor7,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 3");
            if (btnColor7 === "skyblue") {
              setBtnColor7("powderblue");
            } else {
              setBtnColor7("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor8,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 4");
            if (btnColor8 === "skyblue") {
              setBtnColor8("powderblue");
            } else {
              setBtnColor8("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor9,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 5");
            if (btnColor9 === "skyblue") {
              setBtnColor9("powderblue");
            } else {
              setBtnColor9("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor10,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 6");
            if (btnColor10 === "skyblue") {
              setBtnColor10("powderblue");
            } else {
              setBtnColor10("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor11,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 7");
            if (btnColor11 === "skyblue") {
              setBtnColor11("powderblue");
            } else {
              setBtnColor11("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor12,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 8");
            if (btnColor12 === "skyblue") {
              setBtnColor12("powderblue");
            } else {
              setBtnColor12("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor13,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 9");
            if (btnColor13 === "skyblue") {
              setBtnColor13("powderblue");
            } else {
              setBtnColor13("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor14,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 10");
            if (btnColor14 === "skyblue") {
              setBtnColor14("powderblue");
            } else {
              setBtnColor14("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor15,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 11");
            if (btnColor15 === "skyblue") {
              setBtnColor15("powderblue");
            } else {
              setBtnColor15("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 11</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: btnColor16,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("CBSE Class 12");
            if (btnColor16 === "skyblue") {
              setBtnColor16("powderblue");
            } else {
              setBtnColor16("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>CBSE Class 12</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: btnColor17,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("Mechanical_Engineering");
            if (btnColor17 === "skyblue") {
              setBtnColor17("powderblue");
            } else {
              setBtnColor17("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>Mechanical</Text>
          <Text numberOfLines={2} style={styles.CategoryBtnInnerText}>
            Engineering
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: btnColor18,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("Software_Engineering");
            if (btnColor18 === "skyblue") {
              setBtnColor18("powderblue");
            } else {
              setBtnColor18("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>Software</Text>
          <Text numberOfLines={2} style={styles.CategoryBtnInnerText}>
            Engineering
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: btnColor19,
            ...styles.Category,
          }}
          onPress={() => {
            setPressedBtn("Electrical_Engineering");
            if (btnColor19 === "skyblue") {
              setBtnColor19("powderblue");
            } else {
              setBtnColor19("skyblue");
            }
          }}
        >
          <Text style={styles.CategoryBtnInnerText}>Electrical</Text>
          <Text numberOfLines={2} style={styles.CategoryBtnInnerText}>
            Engineering
          </Text>
        </TouchableOpacity>

        {/* None Button */}
        <TouchableOpacity
          style={{
            backgroundColor: btnColor,
            ...styles.Category,
          }}
        >
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
    fontWeight: "bold",
    fontSize: 30,
    marginTop: Dimensions.get("window").width / 3.5,
  },
  Category: {
    // backgroundColor: "powderblue",
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
