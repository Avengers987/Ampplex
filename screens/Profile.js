import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const Profile = ({ userName }) => {
  // const [posts, SetPosts] = useState(0);

  return (
    <View style={styles.Profile}>
      <Text style={styles.UserName}>{userName}</Text>
      <Image
        style={styles.Profile_Picture}
        source={{
          uri: "https://source.unsplash.com/random/200x200?sig=incrementingIdentifier",
        }}
      />
      <View>
        <Text style={styles.PostsNumber}>10</Text>
        <Text
          style={{
            position: "absolute",
            top: 70,
            fontSize: 15,
            left: -36,
          }}
        >
          Posts
        </Text>
      </View>
      <View>
        <Text style={styles.Followers}>67</Text>
        <Text
          style={{
            position: "absolute",
            top: 70,
            fontSize: 15,
            alignSelf: "center",
            left: 50,
          }}
        >
          Followers
        </Text>
      </View>
    </View>
  );
};

export default Profile;

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
    backgroundColor: "white",
    height: 300,
  },
  UserName: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: -225,
  },
  Profile_Picture: {
    width: 90,
    height: 90,
    borderRadius: 100,
    position: "absolute",
    left: 20,
    top: 70,
  },
  PostsNumber: {
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    top: 30,
    left: -25,
  },
  Followers: {
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    left: 70,
    top: 30,
  },
});
