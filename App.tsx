import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { batteryOptimizationCheck, powerManagerCheck, resquestPermission } from './src/notification/notificationPermission';
import './src/notification/notificationListener'; // your notification will be registered for that
import { displayNotification, setCategories } from './src/notification/notificationInitial';
import { registeringAllTriggers } from './src/notification/registerTrigger';

export default function App(): JSX.Element {

  const permissionChecks = async() => {
    resquestPermission()
    registeringAllTriggers()
    setCategories()
    if (Platform.OS == 'android') {
      batteryOptimizationCheck()
      powerManagerCheck()
    }
  }

  useEffect(() => {
    permissionChecks()
  }, [])

  // for displaying notification 
  displayNotification(
    `Water Intake 1/8`,
    'Stay Hydrated', 
    require('./src/assets/images/water.png'),
    'water-intake'
)

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