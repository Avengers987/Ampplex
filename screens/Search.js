import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import LottieView from "lottie-react-native";

const searchForUser = (searchValue, UserName) => {
  if (
    searchValue != "" &&
    searchValue === UserName.substring(0, searchValue.length)
  ) {
    return true;
  }
  return false;
};

const Search = ({ navigation, userID }) => {
  const [searchValue, setSearchValue] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserName = async () => {
    const url = `http://ampplex-backened.herokuapp.com/GetUserNames/`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data);
        setLoading(false);
      });
  };

  const renderItem = ({ item, index }) => {
    console.log(item, index);
    let clickedUserID = item.userID;
    let clickedUserName = item.UserName;
    let myUserId = userID;

    return (
      <>
        {searchForUser(
          searchValue.toLowerCase(),
          item.UserName.toLowerCase()
        ) &&
        response != null &&
        searchValue != null ? (
          <TouchableOpacity
            key={index}
            style={styles.UserView}
            onPress={() =>
              navigation.navigate("UserProfile", {
                clickedUserID,
                clickedUserName, // Check if follow feature is working or not
                myUserId,
              })
            }
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                alignSelf: "center",
              }}
            >
              {item.UserName}
            </Text>
            {/* ProfilePicture */}
            {item.ProfilePicPath !== null ? (
              <Image
                source={{
                  uri: item.ProfilePicPath,
                }}
                style={styles.ProfilePicture}
              />
            ) : (
              <Image
                source={require("../assets/images/default_profile_picture.png")}
                style={styles.ProfilePicture}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.SearchBar}>
        <TextInput
          placeholder={"Search for users..."}
          onChangeText={(e) => setSearchValue(e.trim())}
          value={searchValue}
          style={{
            fontSize: 16,
            marginTop: 12,
            marginLeft: 45,
            paddingRight: 70,
          }}
        />
        {searchValue !== null && searchValue.length > 0 ? (
          <TouchableOpacity
            onPress={() => setSearchValue("")}
            style={{
              position: "absolute",
              right: 0,
              top: 15,
              width: "20%",
              height: "50%",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "sans-serif-medium",
                color: "skyblue",
              }}
            >
              clear
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <Image
          source={require("../Images/search.png")}
          style={styles.SearchIcon}
        />
      </View>

      {loading ? (
        <View
          style={{
            alignSelf: "center",
            marginTop: Dimensions.get("window").height / 2.0,
          }}
        >
          <LottieView
            style={styles.LoadingIndicator}
            source={require("../assets/lottie/loading.json")}
            autoPlay
            loop={true}
          />
        </View>
      ) : (
        <View />
      )}
      <View style={styles.SearchResultsContainer}>
        <FlatList
          data={response}
          renderItem={renderItem}
          keyExtractor={(userID) => userID.userID}
        />
      </View>
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
    elevation: 20,
  },
  SearchIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    top: 15,
    left: 12,
  },
  UserView: {
    width: 300,
    height: 80,
    backgroundColor: "#FAFAFA",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 25,
    elevation: 20,
  },
  ProfilePicture: {
    width: 65,
    height: 65,
    borderRadius: 60,
    position: "absolute",
    top: 5,
    left: 10,
  },
  LoadingIndicator: {
    width: 120,
    height: 120,
    marginTop: 150,
    alignItems: "center",
  },
  SearchResultsContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.2,
    marginTop: 160,
    paddingBottom: 100,
  },
});
