import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { resquestPermission } from './src/notification/notificationPermission';
import './src/notification/notificationListener'; // your notification will be registered for that
import { displayNotification } from './src/notification/notificationInitial';

export default function App(): JSX.Element {

  const permissionChecks = async() => {
    resquestPermission()
  }

  useEffect(() => {
    permissionChecks()
  }, [])

  // display notification 
//   displayNotification(
//     `Water Intake ${waterDinkStamps.length}/8`,
//     'Stay Hydrated', 
//     require('../assets/images/water.png'),
//     'water-intake'
// )

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