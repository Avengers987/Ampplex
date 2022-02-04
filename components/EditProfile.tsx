import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

interface Props {
  navigation: any;
  userID: string;
}

const EditProfile = ({ navigation, userID }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: -15,
          right: -160,
        }}
        onPress={() =>
          navigation.navigate("EditProfile", { userID, navigation })
        }
      >
        <View>
          <Image
            style={styles.EditProfileBtn}
            source={require("../assets/images/settings.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  EditProfileBtn: {
    width: 40,
    height: 40,
  },
});
