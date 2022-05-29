import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'

const Terms_and_Conditions = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>
      <View style={styles.Card}>
      <Text style={styles.title}>Content</Text>
        <Text style={{
            fontSize: 15,
            fontFamily: "sans-serif-medium",
            color: "#7C7C7C",
            marginTop: Dimensions.get("screen").height * 0.03,
            textAlign: "center",
        }}>• You can only upload or publish educational content {'\n\n'}
        • If you publish abusive or illegal content on this app your account will be permanently or temporarily disabled {'\n\n'}
        • If you publish non-educational content your post might be removed{'\n\n'}
        </Text>
      </View>
      <View style={styles.Card2}>
      <Text style={styles.title}>Data</Text>
        <Text style={{
            fontSize: 15,
            fontFamily: "sans-serif-medium",
            color: "#7C7C7C",
            marginTop: Dimensions.get("screen").height * 0.03,
            textAlign: "center",
        }}>• We respect your privacy, hence we store your data in encrypted format in the database{'\n\n'}
        • We don't sell your data to third parties{'\n\n'}
        </Text>
      </View>
    </ScrollView>
  )
}

export default Terms_and_Conditions

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        position: 'absolute',
        top: Dimensions.get('screen').height * 0.09,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        marginTop: Dimensions.get('window').height * 0.02,
    },
    Card: {
        width: Dimensions.get('screen').width * 0.9,
        height: Dimensions.get('screen').height * 0.35,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 2,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: -Dimensions.get('screen').height * 0.2,
        marginBottom: Dimensions.get('screen').height * 0.05,
        padding: 23,
    },
    Card2: {
        width: Dimensions.get('screen').width * 0.9,
        height: Dimensions.get('screen').height * 0.35,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 2,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: -Dimensions.get('screen').height * 0.35,
        padding: 23
    }
})