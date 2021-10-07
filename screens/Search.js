import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
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
  const [searchValue, setSearchValue] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserName = async () => {
    const url = `http://ampplex-backened.herokuapp.com/GetUserNames/`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setResponse(data);
        setLoading(false);
      });
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

      {loading ? (
        <View
          style={{
            alignSelf: "center",
            marginTop: 20,
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

      {response != null && searchValue != null ? (
        response.map((value, index) => {
          let clickedUserID = value.userID;
          let clickedUserName = value.UserName;
          let myUserId = userID;

          if (
            searchForUser(
              searchValue.toLowerCase(),
              value.UserName.toLowerCase()
            )
          ) {
            return (
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
                  {value.UserName}
                </Text>
                <Image
                  source={{
                    uri:
                      value.ProfilePicPath === null
                        ? "https://images.unsplash.com/photo-1514923995763-768e52f5af87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        : value.ProfilePicPath,
                  }}
                  style={styles.ProfilePicture}
                />
              </TouchableOpacity>
            );
          }
        })
      ) : (
        <View />
      )}
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
  UserView: {
    width: 300,
    height: 80,
    backgroundColor: "#FAFAFA",
    borderRadius: 20,
    position: "absolute",
    alignSelf: "center",
    position: "absolute",
    top: 150,
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
    marginTop: -10,
    alignItems: "center",
  },
});
