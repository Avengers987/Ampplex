import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Assignment = () => {
  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        fontFamily: "sans-serif-medium",
      }}>Coming soon!</Text>
    </View>
  );
};

export default Assignment;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
