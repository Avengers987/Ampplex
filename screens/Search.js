import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

const Search = () => {
  const [searchValue, setSearchValue] = useState(null);

  console.log(searchValue);

  return (
    <View style={styles.container}>
      <View style={styles.SearchBar}>
        <TextInput
          placeholder={"Search for users..."}
          value={searchValue}
          onChangeText={(e) => setSearchValue(e)}
          style={{
            fontSize: 16,
            marginTop: 12,
            marginLeft: 45,
          }}
        />
      </View>
      <Image
        source={require("../Images/search.png")}
        style={styles.SearchIcon}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  Profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  SearchBar: {
    backgroundColor: "#fafafa",
    width: Dimensions.get("window").width / 1.2,
    height: 55,
    borderRadius: 70,
    position: "absolute",
    top: 40,
  },
  SearchIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    top: 54,
    left: 43,
  },
});
