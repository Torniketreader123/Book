import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainTabs from './src/navigation/MainTab';



const App = () => {
  return (
  
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>

  );
};

export default App;

const styles = StyleSheet.create({});