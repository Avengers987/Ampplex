import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';  

interface Response {
  Subject: string;
  Questions: {
    CorrectOption: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    question_mark_isThere: boolean;
    question: string;
  }[];
}

interface ViewableItems_Interface {
  CorrectOption: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  question_mark_isThere: boolean;
  question: string;
}

const Assignment = ({route}: any) => {

  const [option1Color, setOption1Color] = useState<string>("#fafafa");
  const [option2Color, setOption2Color] = useState<string>("#fafafa");
  const [option3Color, setOption3Color] = useState<string>("#fafafa");
  const [option4Color, setOption4Color] = useState<string>("#fafafa");
  const [viewableItems, setViewableItems] = useState<ViewableItems_Interface>(null);
  const [Response, setResponse] = useState<Response["Questions"]>(null);
  const [sound, setSound] = React.useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const userID = route.params.userID;
  const postID = route.params.postID;
 
  function* Response_Iterator(Response: Response["Questions"]) {
    if (Response != null) {
      for (let question = 0; question < Response.length; question++) {
        yield Response[question];
      }
    }
  }

  const getAssignments = (): void => {
    const url: string = `https://ampplex-backened.herokuapp.com/getAssignments/${userID}/${postID}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data.Questions);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  // const resp: any = Response_Iterator(Response);

  useEffect(() => {
    getAssignments();
    // const Response_keys = Response[0];
    // console.log(Response_keys);
    // setViewableItems(Response_keys);
  }, []);

   const playSound_option = async (): Promise<void> => {

    const { sound } = await Audio.Sound.createAsync(
       require('../assets/sound/btn_click.wav')
    );
    setSound(sound);

    await sound.playAsync(); }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

   const playSound_submit = async (): Promise<void> => {
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/sound/submit_btn.wav')
    );
    setSound(sound);

    await sound.playAsync(); }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  const Submit_btnHandler = (option_num: number, CorrectOption: string): void => {
    
    // Playing sound when the user click on options
    playSound_option();

    switch (option_num) {
      case 1:
        option1Color === "#fafafa" ? setOption1Color("#FFB668") : setOption1Color("#fafafa");
        // Setting the color of other buttons to white
        setOption2Color("#fafafa");
        setOption3Color("#fafafa");
        setOption4Color("#fafafa");
        break;
      case 2:
        option2Color === "#fafafa" ? setOption2Color("#FFB668") : setOption2Color("#fafafa");
        // Setting the color of other buttons to white
        setOption1Color("#fafafa");
        setOption3Color("#fafafa");
        setOption4Color("#fafafa");
        break;
      case 3:
        option3Color === "#fafafa" ? setOption3Color("#FFB668") : setOption3Color("#fafafa");
        // Setting the color of other buttons to white
        setOption1Color("#fafafa");
        setOption2Color("#fafafa");
        setOption4Color("#fafafa");
        break;
      case 4:
        option4Color === "#fafafa" ? setOption4Color("#FFB668") : setOption4Color("#fafafa");
        // Setting the color of other buttons to white
        setOption1Color("#fafafa");
        setOption2Color("#fafafa");
        setOption3Color("#fafafa");
        break;
      default:
        throw new Error("Invalid Option Number");
    }
  }


  return (
    <View style={styles.container}>

      <View style={styles.Circle1} />
      <View style={styles.Circle2} />

    {Response != undefined && Response != null ?
    Response.map((e: ViewableItems_Interface, index: number) => {
      return (
    <ScrollView key={index}>
      <View style={styles.Mcq_container}>

        <View style={styles.Question}>
          {/* if question mark is there then rendering question mark as well with the question */}
          <Text style={styles.Question_Text}>{e.question}{e.question_mark_isThere ? "?" : ""}</Text>
        </View>

        <View style={{
          marginTop: Dimensions.get('window').height * 0.1,
        }}>
          {/* OPTION A */}
          <Pressable style={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: option1Color,
            elevation: 10,
            width: Dimensions.get('window').width * 0.9,
            height: Dimensions.get('window').height * 0.13,
            borderRadius: Dimensions.get("window").height * 0.02,
            marginTop: -Dimensions.get('window').height * 0.05,
            padding: Dimensions.get('window').height * 0.01,
            }} onPress={() => Submit_btnHandler(1, e.CorrectOption)}>
      
            <Text style={styles.option_Text}>{e.option1}</Text>
          </Pressable>
            
          {/* OPTION B */}
          <Pressable style={{        
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            backgroundColor: option2Color,
            elevation: 10,
            width: Dimensions.get('window').width * 0.9,
            height: Dimensions.get('window').height * 0.13,
            borderRadius: Dimensions.get("window").height * 0.02,
            marginTop: Dimensions.get('window').height * 0.02,
            padding: Dimensions.get('window').height * 0.01,
            }} onPress={() => Submit_btnHandler(2, e.CorrectOption)}>
            {/* length is 191 */}
            <Text style={styles.option_Text}>{e.option2}</Text>
          </Pressable>

          {/* OPTION C */}
          <Pressable style={{        
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            backgroundColor: option3Color,
            elevation: 10,
            width: Dimensions.get('window').width * 0.9,
            height: Dimensions.get('window').height * 0.13,
            borderRadius: Dimensions.get("window").height * 0.02,
            marginTop: Dimensions.get('window').height * 0.02,
            padding: Dimensions.get('window').height * 0.01,
            }} onPress={() => Submit_btnHandler(3, e.CorrectOption)}>
            <Text style={styles.option_Text}>{e.option3}</Text>
          </Pressable>

          {/* OPTION D */}
          <Pressable style={{        
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            backgroundColor: option4Color,
            elevation: 10,
            width: Dimensions.get('window').width * 0.9,
            height: Dimensions.get('window').height * 0.13,
            borderRadius: Dimensions.get("window").height * 0.02,
            marginTop: Dimensions.get('window').height * 0.02,
            padding: Dimensions.get('window').height * 0.01,
            }} onPress={() => Submit_btnHandler(4, e.CorrectOption)}>
            <Text style={styles.option_Text}>{e.option4}</Text>
          </Pressable>
        </View>

        <TouchableOpacity style={styles.Submit_btn} disabled={false} onPress={() => {
          // setViewableItems(resp.next().value);
          // setViewableItems(resp.next().value);
          playSound_submit();
          }}>
          <Text style={styles.Submit_btn_Text}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
      )
    })
    : <View/>}
    </View>
  );
};

export default Assignment;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#8F71FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Mcq_container: {
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.96,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        marginTop: Dimensions.get('window').height * 0.15,
    },
    Circle1: {
        width: 120,
        height: 120,
        backgroundColor: '#fff',
        position: 'absolute',
        top: -Dimensions.get('window').height * 0.03,
        borderRadius: 60,
        opacity: 0.5,
        left: -Dimensions.get('window').width * 0.03,
    },
    Circle2: {
        width: 180,
        height: 180,
        backgroundColor: '#fff',
        position: 'absolute',
        top: -Dimensions.get('window').height * 0.01,
        borderRadius: 90,
        opacity: 0.5,
        right: -Dimensions.get('window').width * 0.08,
    },
    Question: {
        display: 'flex',
        alignItems: 'center',
        position: "absolute",
        top: Dimensions.get('window').height * 0.02,
    },
    Question_Text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'sans-serif-medium',
        textAlign: 'center',
    },
    option_Text: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: "sans-serif-medium",
    },
    Submit_btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF9435',
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.08,
        borderRadius: Dimensions.get("window").height * 0.02,
        bottom: -Dimensions.get('window').height * 0.04,
        elevation: 20,
    },
    Submit_btn_Text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'sans-serif-medium',
        alignSelf: 'center',
    }
});
