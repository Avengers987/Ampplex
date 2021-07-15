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
  const [pressedBtn, setPressedBtn] = useState(new Set()); // Stores the pressed button name
  pressedBtn.delete("N");

  const [icon, setIcon] = useState(
    require("../Images/2x/outline_search_black_24dp.png")
  );

  const [iconType, setIconType] = useState("search");

  // Category button colors
  const [btnColor, setBtnColor] = useState("white");
  const [btnColor1, setBtnColor1] = useState("white");
  const [btnColor2, setBtnColor2] = useState("white");
  const [btnColor3, setBtnColor3] = useState("white");
  const [btnColor4, setBtnColor4] = useState("white");
  const [btnColor5, setBtnColor5] = useState("white");
  const [btnColor6, setBtnColor6] = useState("white");
  const [btnColor7, setBtnColor7] = useState("white");
  const [btnColor8, setBtnColor8] = useState("white");
  const [btnColor9, setBtnColor9] = useState("white");
  const [btnColor10, setBtnColor10] = useState("white");
  const [btnColor11, setBtnColor11] = useState("white");
  const [btnColor12, setBtnColor12] = useState("white");
  const [btnColor13, setBtnColor13] = useState("white");
  const [btnColor14, setBtnColor14] = useState("white");
  const [btnColor15, setBtnColor15] = useState("white");
  const [btnColor16, setBtnColor16] = useState("white");
  const [btnColor17, setBtnColor17] = useState("white");
  const [btnColor18, setBtnColor18] = useState("white");
  const [btnColor19, setBtnColor19] = useState("white");
  const [animationCalled, setAnimationCalled] = useState(0);

  const animatedSearchBar = new Animated.Value(50);
  const animatedSearchBarHeight = new Animated.Value(50);

  if (animationCalled === 0) {
    setTimeout(() => {
      Animated.timing(animatedSearchBar, {
        toValue: 65,
        duration: 1100,
        useNativeDriver: false,
      }).start();
    }, 1000);
    setTimeout(() => {
      Animated.timing(animatedSearchBarHeight, {
        toValue: 65,
        duration: 1100,
        useNativeDriver: false,
      }).start();
    }, 1000);

    setTimeout(() => {
      Animated.timing(animatedSearchBar, {
        toValue: 300,
        duration: 1100,
        useNativeDriver: false,
      }).start();
    }, 1500);
    setAnimationCalled(1);
  }

  console.log(pressedBtn);
  console.log(searchVal);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          backgroundColor: "white",
          width: animatedSearchBar,
          height: animatedSearchBarHeight,
          borderRadius: 50,
          position: "absolute",
          right: 50,
          top: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            borderRadius: 100,
            height: 65,
            marginLeft: 55,
            fontSize: 20,
          }}
          onChangeText={(srch_val) => setSearchVal(srch_val)}
          placeholder={"Search..."}
        />
        <Image
          onPress={() => {
            if (iconType === "back") {
              setIcon(require("../Images/2x/outline_search_black_24dp.png"));
              setIconType("search");
            }
          }}
          source={icon}
          style={styles.searchIcon}
        />
      </Animated.View>
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
            setPressedBtn(pressedBtn.add("Coding"));
            if (btnColor === "powderblue") {
              pressedBtn.delete("Coding");
              setBtnColor("white");
            } else {
              setBtnColor("powderblue");
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
            setPressedBtn(pressedBtn.add("JEE"));
            if (btnColor1 === "powderblue") {
              pressedBtn.delete("JEE");
              setBtnColor1("white");
            } else {
              setBtnColor1("powderblue");
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
            setPressedBtn(pressedBtn.add("NEET"));
            if (btnColor2 === "powderblue") {
              pressedBtn.delete("NEET");
              setBtnColor2("white");
            } else {
              setBtnColor2("powderblue");
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
            setPressedBtn(pressedBtn.add("Sports"));
            if (btnColor3 === "powderblue") {
              pressedBtn.delete("Sports");
              setBtnColor3("white");
            } else {
              setBtnColor3("powderblue");
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
            setPressedBtn(pressedBtn.add("Acting"));
            if (btnColor4 === "powderblue") {
              pressedBtn.delete("Acting");
              setBtnColor4("white");
            } else {
              setBtnColor4("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 1"));
            if (btnColor5 === "powderblue") {
              pressedBtn.delete("CBSE Class 1");
              setBtnColor5("white");
            } else {
              setBtnColor5("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 2"));
            if (btnColor6 === "powderblue") {
              pressedBtn.delete("CBSE Class 2");
              setBtnColor6("white");
            } else {
              setBtnColor6("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 3"));
            if (btnColor7 === "powderblue") {
              pressedBtn.delete("CBSE Class 3");
              setBtnColor7("white");
            } else {
              setBtnColor7("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 4"));
            if (btnColor8 === "powderblue") {
              pressedBtn.delete("CBSE Class 4");
              setBtnColor8("white");
            } else {
              setBtnColor8("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 5"));
            if (btnColor9 === "powderblue") {
              pressedBtn.delete("CBSE Class 5");
              setBtnColor9("white");
            } else {
              setBtnColor9("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 6"));
            if (btnColor10 === "powderblue") {
              pressedBtn.delete("CBSE Class 6");
              setBtnColor10("white");
            } else {
              setBtnColor10("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 7"));
            if (btnColor11 === "powderblue") {
              pressedBtn.delete("CBSE Class 7");
              setBtnColor11("white");
            } else {
              setBtnColor11("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 8"));
            if (btnColor12 === "powderblue") {
              pressedBtn.delete("CBSE Class 8");
              setBtnColor12("white");
            } else {
              setBtnColor12("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 9"));
            if (btnColor13 === "powderblue") {
              pressedBtn.delete("CBSE Class 9");
              setBtnColor13("white");
            } else {
              setBtnColor13("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 10"));
            if (btnColor14 === "powderblue") {
              pressedBtn.delete("CBSE Class 10");
              setBtnColor14("white");
            } else {
              setBtnColor14("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 11"));
            if (btnColor15 === "powderblue") {
              pressedBtn.delete("CBSE Class 11");
              setBtnColor15("white");
            } else {
              setBtnColor15("powderblue");
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
            setPressedBtn(pressedBtn.add("CBSE Class 12"));
            if (btnColor16 === "powderblue") {
              pressedBtn.delete("CBSE Class 12");
              setBtnColor16("white");
            } else {
              setBtnColor16("powderblue");
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
            setPressedBtn(pressedBtn.add("Mechanical_Engineering"));
            if (btnColor17 === "powderblue") {
              pressedBtn.delete("Mechanical_Engineering");
              setBtnColor17("white");
            } else {
              setBtnColor17("powderblue");
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
            setPressedBtn(pressedBtn.add("Software_Engineering"));
            if (btnColor18 === "powderblue") {
              pressedBtn.delete("Software_Engineering");
              setBtnColor18("white");
            } else {
              setBtnColor18("powderblue");
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
            setPressedBtn(pressedBtn.add("Electrical_Engineering"));
            if (btnColor19 === "powderblue") {
              pressedBtn.delete("Electrical_Engineering");
              setBtnColor19("white");
            } else {
              setBtnColor19("powderblue");
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
      {pressedBtn.size > 0 ? (
        <TouchableOpacity style={styles.nextNavigation}>
          {/* <Text style={styles.nextNavigationIcon}>{">"}</Text> */}
          <Image
            style={styles.nextNavigationIcon}
            source={require("../Images/2x/done.png")}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
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
    // backgroundColor: "white",
    width: 180,
    height: 50,
    marginTop: 30,
    marginLeft: 10,
    borderRadius: 10,
  },
  CategoryBtnInnerText: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    color: "black",
  },
  searchIcon: {
    width: 30,
    height: 30,
    position: "absolute",
    left: 10,
    marginTop: 16,
    alignSelf: "center",
  },
  nextNavigation: {
    backgroundColor: "skyblue",
    width: 50,
    height: 50,
    borderRadius: 100,
    position: "absolute",
    right: 20,
    bottom: 150,
  },
  nextNavigationIcon: {
    alignSelf: "center",
  },
});
