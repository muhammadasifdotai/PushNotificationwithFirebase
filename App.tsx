import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App(): JSX.Element {

  useEffect(() => {
    getDeviceToken()
  }, [])

  const getDeviceToken = async () => {
    const token = await messaging().getToken()
    console.log(token)
  }

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Alhamdulillah</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'green',
    fontSize: 40,
  }
})