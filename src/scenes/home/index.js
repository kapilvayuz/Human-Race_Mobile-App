import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {CustomText} from '../../styles/typo'
const HomeScreen = ({navigation}) => (
  <SafeAreaView>
    <TouchableHighlight onPress={() => navigation.back()}>
    <CustomText>Back to login</CustomText>
    </TouchableHighlight>
   
  </SafeAreaView>
);

export default HomeScreen;
