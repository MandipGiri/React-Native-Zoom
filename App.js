import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  Text,
  StatusBar,
  Pressable,
  TextInput,
} from 'react-native';

import ZoomUs from 'react-native-zoom-us';
import {Keys} from './src/config/Keys';
import {createMeeting} from './src/utils/CreateMeeting';
import {createUserZAK} from './src/utils/CreateZAK';
import {generateToken} from './src/utils/GenerateToken';
import {getUserID} from './src/utils/GetUserId';

const App = () => {
  const [meetingId, setmeetingId] = useState('');
  const [customerMeetingId, setcustomerMeetingId] = useState('');

  useEffect(() => {
    initializeZoom();
  }, []);

  const initializeZoom = async () => {
    // initialize minimal
    await ZoomUs.initialize({
      clientKey: Keys.CLIENT_KEY,
      clientSecret: Keys.CLIENT_SECRET,
    });
  };

  // Start Meeting
  const startMeet = async () => {
    try {
      let jwtToken = await generateToken();
      let userResult = await getUserID('mandip.giri@amniltech.com', jwtToken);
      const {id: userId, first_name, last_name} = userResult;
      let zoomAccessToken = await createUserZAK(userId, jwtToken);
      let meetingId = await createMeeting(userId, jwtToken);
      console.log(`meetingId`, meetingId);
      setmeetingId(meetingId);
      await ZoomUs.startMeeting({
        userName: `${first_name} ${last_name}`,
        meetingNumber: meetingId.id,
        userId: userId,
        zoomAccessToken: zoomAccessToken.token,
      });
    } catch (err) {
      console.log(`err`, err);
      Alert.alert('Error', err);
    }
  };

  const joinMeet = async () => {
    if (customerMeetingId) {
      // Join Meeting
      try {
        await ZoomUs.joinMeeting({
          userName: `Bedh Dhakal`,
          meetingNumber: customerMeetingId,
        });
      } catch (error) {
        Alert.alert(error);
      }
    } else {
      Alert.alert(
        'Have patience your doctor is not ready at the moment.Try again in a while',
      );
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#5DC29C',
              fontSize: 22,
              marginBottom: 20,
              textAlign: 'center',
            }}>
            {`ePharmacy \n Doctor Module`}
          </Text>
          <Pressable
            style={{
              padding: 10,
              borderRadius: 6,
              backgroundColor: 'green',
              minWidth: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={startMeet}>
            <Text style={{color: 'white'}}>Start Call</Text>
          </Pressable>
          <TextInput
            onChangeText={(text) => setcustomerMeetingId(text)}
            style={{
              width: '90%',
              height: 45,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: 'grey',
              marginTop: 20,
            }}
            placeholder={'Meeting Id'}
          />
          <Pressable
            style={{
              padding: 10,
              borderRadius: 6,
              backgroundColor: 'blue',
              minWidth: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}
            onPress={joinMeet}>
            <Text style={{color: 'white'}}>Join Call</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
